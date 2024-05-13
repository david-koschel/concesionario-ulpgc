package ps.backend.entity;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor@Entity
@Getter
@Setter
@Builder
@Table(name = "user_independent_extras")
public class UserIndependentExtras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @Column(columnDefinition="MEDIUMTEXT")
    private String image;

    private Float price;

    @ManyToOne
    private User user;

}
