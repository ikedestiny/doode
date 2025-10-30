package com.dev.doode.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum City {
    MOSCOW,
    SAINT_PETERSBURG,
    NOVOSIBIRSK,
    YEKATERINBURG,
    KAZAN,
    NIZHNY_NOVGOROD,
    CHELYABINSK,
    SAMARA,
    OMSK,
    ROSTOV_ON_DON,
    UFA,
    KRASNOYARSK,
    VORONEZH,
    PERM,
    VOLGOGRAD,
    KRASNODAR,
    SARATOV,
    TYUMEN,
    TOGLYATTI,
    IZHEVSK,
    BARNAUL,
    ULYANOVSK,
    IRKUTSK,
    KHABAROVSK,
    YAROSLAVL,
    VLADIVOSTOK,
    MAKHACHKALA,
    TOMSK,
    ORENBURG,
    KEMEROVO,
    NOVOKUZNETSK,
    RYAZAN,
    ASTRAKHAN,
    NABEREZHNYE_CHELNY,
    PENZA,
    KIROV,
    LIPETSK,
    BALASHIKHA,
    CHEBOKSARY,
    KALININGRAD;

    @JsonCreator
    public static City fromString(String value) {
        if (value == null) return null;

        // Normalize: uppercase, replace spaces and hyphens with underscores
        String normalized = value.trim()
                .toUpperCase()
                .replace(" ", "_")
                .replace("-", "_");

        for (City city : City.values()) {
            if (city.name().equals(normalized)) {
                return city;
            }
        }
        throw new IllegalArgumentException("Unknown city: " + value);
    }

    @JsonValue
    public String toValue() {
        // Human-readable name for JSON responses
        String[] parts = name().split("_");
        StringBuilder formatted = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            if (i > 0) formatted.append("_");
            formatted.append(Character.toUpperCase(parts[i].charAt(0)))
                    .append(parts[i].substring(1).toLowerCase());
        }
        return formatted.toString();
    }
}
