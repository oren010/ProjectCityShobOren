import { platformServer } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';
import { enableProdMode } from '@angular/core';

enableProdMode();

platformServer().bootstrapModule(AppServerModule)
  .catch(err => console.error(err));

export default AppServerModule;  // Ajoutez cette ligne
