import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'Patientview/:id',
    renderMode: RenderMode.Client // This skips prerendering for this route
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
