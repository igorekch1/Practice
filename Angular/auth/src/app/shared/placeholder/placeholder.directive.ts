import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[appPlaceHoder]" })
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
