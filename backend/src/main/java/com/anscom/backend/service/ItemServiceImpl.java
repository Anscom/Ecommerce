package com.anscom.backend.service;

import com.anscom.backend.constant.SizeEnum;
import com.anscom.backend.dto.ImageDto;
import com.anscom.backend.dto.ItemDto;
import com.anscom.backend.exception.ItemNotFoundException;
import com.anscom.backend.model.Image;
import com.anscom.backend.model.Item;
import com.anscom.backend.repository.ImageRepository;
import com.anscom.backend.repository.ItemRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;

    public ItemServiceImpl(ItemRepository itemRepository, ImageRepository imageRepository) {
        this.itemRepository = itemRepository;
        this.imageRepository = imageRepository;
    }

    @Override
    public ItemDto getItemById(long id) {
        log.info("Fetching item by id {} ", id);
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("There's no item with id " + id));
        ItemDto itemDto = newItemDto(item);
        log.info("Fetched item {} ", itemDto);
        return itemDto;
    }

    @Override
    public Page<ItemDto> getItems(Pageable pageable, SizeEnum size, String color, Long minPrice, Long maxPrice, String keyword) {
        Specification<Item> spec = Specification.where(null);

        if(size != null) {
            spec = spec.and(((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("size"), size)));
        }
        if(color != null && !color.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("color"), color));
        }
        // Price range filtering
        if (minPrice != null && maxPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(root.get("price"), minPrice, maxPrice));
        } else if (minPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
        } else if (maxPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if(keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + keyword + "%"));
        }
        return itemRepository.findAll(spec, pageable).map(this::newItemDto);
    }

    //    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
    //        product.setImageName(imageFile.getOriginalFilename());
    //        product.setImageType(imageFile.getContentType());
    //        product.setImageData(imageFile.getBytes());
    //
    //        return repo.save(product);
    //    }
    @Override
    public ItemDto saveItem(ItemDto itemDto, MultipartFile[] imageFiles) {
        log.info("Saving new item: {}", itemDto);

        try {
            // 1. Create and save the item first
            Item item = new Item();
            item.setName(itemDto.getName());
            item.setDescription(itemDto.getDescription());
            item.setPrice(itemDto.getPrice());
            item.setColor(itemDto.getColor());
            item.setStock(itemDto.getStock());
            item.setGender(itemDto.getGender());
            item.setSize(itemDto.getSize());
            item.setMaterial(itemDto.getMaterial());
            item.setRating(itemDto.getRating());

            Item savedItem = itemRepository.save(item); // Save item first
            // 2. Save multiple images and link them to the item
            if (imageFiles != null && imageFiles.length > 0) {
                List<Image> imageList = new ArrayList<>();
                for (MultipartFile imageFile : imageFiles) {
                    if (!imageFile.isEmpty()) {
                        Image image = new Image();
                        image.setImageName(imageFile.getOriginalFilename());
                        image.setImageType(imageFile.getContentType());
                        image.setImageData(imageFile.getBytes());
                        image.setItem(savedItem);  // Link image to the item
                        imageList.add(image);
                    }
                }
                imageRepository.saveAll(imageList);
            }

            log.info("Item and image saved successfully");

            return newItemDto(savedItem);

        } catch (Exception e) {
            log.error("Error saving item: {}", e.getMessage(), e);
            return null;
        }
    }

    @Override
    public List<ImageDto> getImagesByItemId(Long itemId) {
        List<Image> images = imageRepository.findByItemId(itemId);  // Ensure correct field reference

        log.info("Fetched {} images for item {}", images.size(), itemId);
        images.forEach(img -> log.info("Image: ID={}, Name={}", img.getId(), img.getImageName()));

        return images.stream()
                .map(this::convertToImageDto)
                .collect(Collectors.toList());
    }


    private ImageDto convertToImageDto(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .imageName(image.getImageName())
                .imageType(image.getImageType())
                .build();
    }


    private ItemDto newItemDto(Item item) {
        int imageCount = imageRepository.countByItemId(item.getId());
        return ItemDto.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .color(item.getColor())
                .stock(item.getStock())
                .gender(item.getGender())
                .size(item.getSize())
                .material(item.getMaterial())
                .rating(item.getRating())
                .imageCount(imageCount)
                .build();
    }
}
