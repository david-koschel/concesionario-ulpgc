package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.IndependentExtra;
import ps.backend.entity.UserIndependentExtras;
import ps.backend.service.IndependentExtraService;

import java.util.List;

@RestController
@RequestMapping("api/independent-extras")
public class IndependentExtraController {
    private final IndependentExtraService independentExtraService;

    public IndependentExtraController(IndependentExtraService independentExtraService) {
        this.independentExtraService = independentExtraService;
    }

    @GetMapping("/all")
    public List<IndependentExtra> getIndependentExtras(){
        return independentExtraService.findAll();
    }

    @PostMapping("/buy/{id}")
    public PaymentInfoDto saveUserIndependentExtra(@PathVariable Integer id) {
        return independentExtraService.buyUserIndependentExtra(id);
    }

    @GetMapping("/get-user-extras")
    public List<UserIndependentExtras> getUserIndependentExtras() {
        return independentExtraService.getUserIndependentExtras();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add-independent-extra")
    public void addIndependentExtra(@RequestBody IndependentExtra independentExtra){
        independentExtraService.saveIndependentExtra(independentExtra);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/update-independent-extra")
    public void updateIndependentExtra(@RequestBody IndependentExtra independentExtra){
        independentExtraService.updateIndependentExtra(independentExtra);
    }



}
