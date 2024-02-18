import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
//registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0QXxbf1x0ZFRMYlpbRHdPIiBoS35RckViW3pfc3dRRmNcUUN0');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
