package com.anscom.backend.service;

import com.anscom.backend.dto.ImageDto;
import com.anscom.backend.model.Image;
import com.anscom.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService{
    private final ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public ImageDto getImageById(Long id) {
        Optional<Image> imageOpt = imageRepository.findById(id);

        if (imageOpt.isEmpty()) {
            return null; // Or throw a custom exception like ImageNotFoundException
        }

        Image image = imageOpt.get();
        return convertToImageDto(image);
    }

    private ImageDto convertToImageDto(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .imageName(image.getImageName())
                .imageType(image.getImageType())
                .imageData(image.getImageData()) // If you need binary data
                .build();
    }
}
