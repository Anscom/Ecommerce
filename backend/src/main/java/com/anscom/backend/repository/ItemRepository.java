package com.anscom.backend.repository;

import com.anscom.backend.constant.SizeEnum;
import com.anscom.backend.model.Image;
import com.anscom.backend.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findAll(Specification<Item> spec, Pageable pageable);


//    @Query("SELECT i FROM Item i " +
//            "WHERE (:name IS NULL OR i.name = :name) " +
//            "AND (:gender IS NULL OR i.gender = :gender) " +
//            "AND (:price IS NULL OR i.price = :price) " +
//            "AND (:color IS NULL OR i.color = :color) " +
//            "AND (:size IS NULL OR i.size = :size) " +
//            "AND (:stock IS NULL OR i.stock = :stock)")
//    Page<Item> getFilteredItems(
//            @Param("name") String name,
//            @Param("gender") String gender,
//            @Param("price") Double price,
//            @Param("color") String color,
//            @Param("size") SizeEnum size,
//            @Param("stock") Double stock,
//            Pageable pageable
//    );
}

