package ps.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.Blog;
import ps.backend.exception.BasicException;
import ps.backend.service.BlogService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/public/id/{id}")
    public Blog findByName(@PathVariable Integer id){
        return blogService.findPublishedById(id);
    }

    @PostMapping("/public/newsletter")
    public void subscribeToNewsletter(@RequestBody String email){
        blogService.subscribeToNewsletter(email);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<Blog> findAll(){
        return blogService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public Blog findById(@PathVariable Integer id){
        return blogService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public Blog update(@RequestBody Blog blog, @PathVariable Integer id) {
        return blogService.update(blog, id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Blog save(@RequestBody Blog blog) {
        return blogService.save(blog);
    }

    @ExceptionHandler(BasicException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public Map<String, String> exceptionHandler(BasicException e) {
        Map<String, String> result = new HashMap<>();
        result.put("message", e.getMessage());
        return result;
    }

}
