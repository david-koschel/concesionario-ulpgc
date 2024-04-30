package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.Blog;
import ps.backend.service.BlogService;

import java.util.List;

@RestController
@RequestMapping("api/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/public")
    public List<Blog> findAllPublished(){
        return blogService.findAllPublished();
    }

    @GetMapping("/public/show")
    public List<Blog> findAllPublishedBeforeToday(){
        return blogService.findAllPublishedBeforeToday();
    }

    @GetMapping("/public/{name}")
    public Blog findByName(@PathVariable String name){
        return blogService.findPublishedByName(name);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Blog> findAll(){
        return blogService.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Blog findById(@PathVariable Integer id){
        return blogService.findById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Blog update(@RequestBody Blog blog, @PathVariable Integer id) {
        return blogService.update(blog, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Blog save(@RequestBody Blog blog) {
        return blogService.save(blog);
    }
}
