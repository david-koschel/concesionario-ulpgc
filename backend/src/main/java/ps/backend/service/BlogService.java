package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.Blog;
import ps.backend.repository.BlogRepository;

import javax.management.openmbean.KeyAlreadyExistsException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;


    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    public List<Blog> findAllPublished() {
        return blogRepository.findAllPublished();
    }

    public List<Blog> findAllPublishedBeforeToday() {
        return new ArrayList<>(blogRepository.findAllPublished());
    }

    public Blog findById(int id) {
        return blogRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Blog findPublishedByName(String name) {
        return blogRepository.findPublishedByName(name).orElseThrow(NoSuchElementException::new);
    }

    public Blog save(Blog blog) {

        if (blogRepository.findByTitle(blog.getTitle()).isPresent()) {
            throw new KeyAlreadyExistsException("Ya existe una entrada con este nombre");
        }

        blog.setTitle(blog.getTitle());
        blog.setModificationDate(ZonedDateTime.now());
        return blogRepository.save(blog);
    }

    public Blog update(Blog blog, Integer id) {

        Blog blogToUpdate = this.findById(id);

        if (!Objects.equals(blogToUpdate.getTitle(), blog.getTitle()) && blogRepository.findByTitle(blog.getTitle()).isPresent()) {
            throw new NoSuchElementException("Ya existe una entrada con este nombre");
        }

        blogToUpdate.setTitle(blog.getTitle());
        blogToUpdate.setData(blog.getData());
        blogToUpdate.setModificationDate(ZonedDateTime.now());
        blogToUpdate.setPublished(blog.isPublished());

        return blogRepository.save(blogToUpdate);
    }
}
