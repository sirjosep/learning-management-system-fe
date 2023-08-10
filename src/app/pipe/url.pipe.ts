import { Pipe, PipeTransform } from "@angular/core";
import { BASE_URL } from "../constant/api.constant";

@Pipe({
    name: 'url',
    standalone: true
})
export class UrlPipe implements PipeTransform{
    transform(value: any): string {
        return `${BASE_URL}/files/${value}`
    }
}