package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.entity.Blog;
import ps.backend.entity.BlogSubscription;
import ps.backend.entity.User;
import ps.backend.exception.BasicException;
import ps.backend.repository.BlogRepository;
import ps.backend.repository.BlogSubscriptionRepository;

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
    private final BlogSubscriptionRepository blogSubscriptionRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;


    public BlogService(BlogRepository blogRepository, BlogSubscriptionRepository blogSubscriptionRepository, EmailService emailService, TemplateEngine templateEngine) {
        this.blogRepository = blogRepository;
        this.blogSubscriptionRepository = blogSubscriptionRepository;
        this.emailService = emailService;
        this.templateEngine = templateEngine;
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

    public Blog findPublishedById(Integer id) {
        return blogRepository.findBlogByIdAndPublishedIsTrue(id).orElseThrow(NoSuchElementException::new);
    }

    public Blog save(Blog blog) {

        if (blogRepository.findByTitle(blog.getTitle()).isPresent()) {
            throw new KeyAlreadyExistsException("Ya existe una entrada con este nombre");
        }

        boolean sendNewsletter = blog.isPublished();

        blog.setTitle(blog.getTitle());
        blog.setModificationDate(ZonedDateTime.now());
        Blog savedBlog = blogRepository.save(blog);
        if (sendNewsletter) this.sendNewsletter(savedBlog);
        return savedBlog;
    }

    public Blog update(Blog blog, Integer id) {

        Blog blogToUpdate = this.findById(id);

        if (!Objects.equals(blogToUpdate.getTitle(), blog.getTitle()) && blogRepository.findByTitle(blog.getTitle()).isPresent()) {
            throw new NoSuchElementException("Ya existe una entrada con este nombre");
        }

        boolean sendNewsletter = blog.isPublished() && !blogToUpdate.isPublished();

        blogToUpdate.setTitle(blog.getTitle());
        blogToUpdate.setData(blog.getData());
        blogToUpdate.setModificationDate(ZonedDateTime.now());
        blogToUpdate.setPublished(blog.isPublished());

        Blog updatedBlog = blogRepository.save(blogToUpdate);
        if (sendNewsletter) this.sendNewsletter(updatedBlog);
        return updatedBlog;
    }

    public void subscribeToNewsletter(String email) {
        if (blogSubscriptionRepository.findByEmail(email).isEmpty()) {
            blogSubscriptionRepository.save(BlogSubscription.builder().email(email).build());
        } else {
            throw new BasicException("El correo ya está suscrito a nuestro blog");
        }
    }

    private void sendNewsletter(Blog blog) {
        String[] subscriptions = blogSubscriptionRepository.findAll().stream().map(BlogSubscription::getEmail).toArray(String[]::new);
        if (subscriptions.length > 0) {
            emailService.sendMultipleEmail(
                    "Blog Concesionario ULPGC: " + blog.getTitle(),
                    generateEmailBody(blog),
                    subscriptions
            );
        }
    }

    private String generateEmailBody(Blog blog) {
        Context context = new Context();
        context.setVariable("title", blog.getTitle());
        context.setVariable("url", String.format("http://localhost:4200/blogs/%s", blog.getId()));
        return this.templateEngine.process("newsletter.html", context);
    }

}
