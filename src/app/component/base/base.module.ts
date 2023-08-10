import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { NavbarModule } from "../navbar/navbar.module";
import { BaseComponent } from "./base.component";
import { AppRouting } from "src/app/app.routing";

@NgModule({
    declarations: [
        BaseComponent
    ],
    imports: [
        NavbarModule, 
        RouterModule
    ]
})
export class BaseModule {

}