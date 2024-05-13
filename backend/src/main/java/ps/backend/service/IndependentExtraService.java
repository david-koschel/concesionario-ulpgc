package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.IndependentExtra;
import ps.backend.entity.User;
import ps.backend.entity.UserIndependentExtras;
import ps.backend.repository.IndependentExtraRepository;
import ps.backend.repository.UserIndependentExtrasRepository;

import java.util.List;

@Service
public class IndependentExtraService {
    private final IndependentExtraRepository independentExtraRepository;
    private final UserService userService;
    private final UserIndependentExtrasRepository userIndependentExtrasRepository;

    public IndependentExtraService(IndependentExtraRepository independentExtraRepository, UserService userService, UserIndependentExtrasRepository userIndependentExtrasRepository) {
        this.independentExtraRepository = independentExtraRepository;
        this.userService = userService;
        this.userIndependentExtrasRepository = userIndependentExtrasRepository;
    }

    public List<IndependentExtra> findAll(){
        return  independentExtraRepository.findAll();
    }


    public List<UserIndependentExtras> getUserIndependentExtras(){
        return userService.findLoggedUser().getUserIndependentExtras();
    }

    public void saveUserIndependentExtra(Integer id) {
        User user = userService.findLoggedUser();
        IndependentExtra independentExtra = independentExtraRepository.findById(id).orElse(null);

        UserIndependentExtras userIndependentExtras = UserIndependentExtras.builder()
                .user(user)
                .name(independentExtra.getName())
                .description(independentExtra.getDescription())
                .image(independentExtra.getImage())
                .price(independentExtra.getPrice())
                .build();


        UserIndependentExtras save = userIndependentExtrasRepository.save(userIndependentExtras);
    }


    public IndependentExtra saveIndependentExtra(IndependentExtra independentExtra) {
        return independentExtraRepository.save(independentExtra);
    }

    public IndependentExtra updateIndependentExtra(IndependentExtra independentExtra){
        return independentExtraRepository.save(independentExtra);
    }

}

