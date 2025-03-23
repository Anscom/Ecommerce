package com.anscom.backend.service;

import com.anscom.backend.constant.CategoryEnum;
import com.anscom.backend.constant.SizeEnum;
import com.anscom.backend.dto.ImageDto;
import com.anscom.backend.dto.ItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemDto getItemById(long id);
    Page<ItemDto> getItems(Pageable pageable, SizeEnum size, String color, Long minPrice, Long maxPrice, String keyword, CategoryEnum categoryEnum);
    ItemDto saveItem(ItemDto itemDto, MultipartFile[] imageFiles);
    List<ImageDto> getImagesByItemId(Long itemId);
    ItemDto updateItem(Long itemId, ItemDto itemDto, MultipartFile[] imageFiles);
    void deleteItem(Long itemId);
    List<ItemDto> getAllItems();
}

// size, color, price