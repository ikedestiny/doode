package com.dev.doode.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class StringEncoder {
    private  static  final PasswordEncoder encoder = new BCryptPasswordEncoder();


    public String encode(String string){
        return encoder.encode(string);
    }

    public boolean check(String raw, String encoded){
        return encoder.matches(raw,encoded);
    }

}
