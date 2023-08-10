import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { NavbarComponent } from "./navbar.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        NavbarComponent
    ],
    imports: [
        RouterModule, CommonModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {

}