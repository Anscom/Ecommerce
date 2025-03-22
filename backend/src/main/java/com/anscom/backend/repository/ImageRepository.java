package com.anscom.backend.repository;

import com.anscom.backend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByItemId(Long itemId); // Fetch images by item ID
    int countByItemId(Long itemId);

    Optional<Image> findById(Long id);
}
