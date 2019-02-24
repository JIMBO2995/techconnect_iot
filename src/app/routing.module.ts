import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';

const routes: Routes = [
  { path: "", redirectTo: '/chat', pathMatch: 'full'},
  //{ path: "", component: GalleryListComponent },
  { path: "", loadChildren: "./chat/chat.module#ChatModule" },
  { path: "", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "", loadChildren: "./gallery/gallery.module#GalleryModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
