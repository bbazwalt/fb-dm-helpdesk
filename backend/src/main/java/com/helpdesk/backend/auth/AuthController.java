package com.helpdesk.backend.auth;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdesk.backend.configuration.JwtProvider;
import com.helpdesk.backend.user.CustomUserServiceImpl;
import com.helpdesk.backend.user.User;
import com.helpdesk.backend.user.UserException;
import com.helpdesk.backend.user.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private CustomUserServiceImpl customUserServiceImpl;

	public AuthController(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder,
			CustomUserServiceImpl customUserServiceImpl) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.customUserServiceImpl = customUserServiceImpl;
	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody UserSignupRequest request)
			throws UserException {
		try {
			String password = request.getPassword();
			String name = request.getName();
			String email = request.getEmail();

			User isEmailExists = userRepository.findByEmail(email);

			if (isEmailExists != null) {
				throw new UserException("Email is already used with another account");
			}

			User createdUser = new User();
			createdUser.setPassword(passwordEncoder.encode(password));
			createdUser.setName(name);
			createdUser.setEmail(email);
			createdUser.setCreatedAt(Instant.now());
			User savedUser = userRepository.save(createdUser);
			Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
					savedUser.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtProvider.generateToken(authentication);
			AuthResponse authResponse = new AuthResponse(token, true, "Signup successfull");
			return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
		} catch (UserException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage(e.getMessage());
			return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginUserHandler(@Valid @RequestBody UserSigninRequest loginRequest)
			throws BadCredentialsException {
		try {
			String email = loginRequest.getEmail();
			String password = loginRequest.getPassword();
			Authentication authentication = authenticate(email, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtProvider.generateToken(authentication);
			AuthResponse authResponse = new AuthResponse(token, true, "Signin successfull");
			return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage(e.getMessage());
			return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage(e.getMessage());
			return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
		}

	}

	private Authentication authenticate(String email, String password) throws BadCredentialsException {
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(email);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid email");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
