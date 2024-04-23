package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleEngine;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleExtra;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleRim;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;
import ps.backend.service.ConfigurableVehicleService;
import ps.backend.service.configurableVehicle.EngineService;
import ps.backend.service.configurableVehicle.ExtraService;
import ps.backend.service.configurableVehicle.RimService;

import java.util.List;

@RestController
@RequestMapping("api/vehicle")
public class VehicleController {

    private final ConfigurableVehicleService configurableVehicleService;
    private final EngineService engineService;
    private final RimService rimService;
    private final ExtraService extraService;

    public VehicleController(ConfigurableVehicleService configurableVehicleService, EngineService engineService, RimService rimService, ExtraService extraService) {
        this.configurableVehicleService = configurableVehicleService;
        this.engineService = engineService;
        this.rimService = rimService;
        this.extraService = extraService;
    }

    @GetMapping("/public/{id}")
    public ConfigurableVehicle getVehicle(@PathVariable Integer id) {
        return configurableVehicleService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/engine")
    public List<ConfigurableVehicleEngine> getEngines() {
        return engineService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/rim")
    public List<ConfigurableVehicleRim> getRims() {
        return rimService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/extra")
    public List<ConfigurableVehicleExtra> getExtras() {
        return extraService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/engine")
    public void addEngine(@RequestBody ConfigurableVehicleEngine engine) {
        engineService.save(engine);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/rim")
    public void addRim(@RequestBody ConfigurableVehicleRim rim) {
        rimService.save(rim);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/extra")
    public void addExtra(@RequestBody ConfigurableVehicleExtra extra) {
        extraService.save(extra);
    }

    @PostMapping("/configuration")
    public UserConfiguration saveUserConfiguration(@RequestBody UserConfiguration configuration) {
        return configurableVehicleService.saveConfiguration(configuration);
    }

    @GetMapping("/configuration")
    public List<UserConfiguration> getUserConfigurations() {
        return configurableVehicleService.getConfigurations();
    }

    @GetMapping("/buy/{id}")
    public void saveUserVehicle(@PathVariable Integer id) {
        configurableVehicleService.saveVehicle(id);
    }

    @GetMapping("/bought")
    public List<UserVehicle> getUserVehicles() {
        return configurableVehicleService.getUserVehicles();
    }
}
