package com.anscom.backend.service;

import com.anscom.backend.dto.ImageDto;

public interface ImageService {
    ImageDto getImageById(Long id);
}
