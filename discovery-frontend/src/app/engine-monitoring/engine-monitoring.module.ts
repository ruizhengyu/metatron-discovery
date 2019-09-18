/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from '@angular/core';
import {IngestionComponent} from './ingestion/ingestion.component';
import {QueryComponent} from './component/query/query.component';
import {EngineMonitoringComponent} from './engine-monitoring.component';
import {CommonModule} from '../common/common.module';
import {RouterModule} from '@angular/router';
import {DruidClusterInformationComponent} from './component/druid-cluster-information/druid-cluster-information.component';
import {Engine} from '../domain/engine-monitoring/engine';
import {HeaderOptionComponent} from './component/header-option/header-option.component';
import {HeaderMenuComponent} from './component/header-menu/header-menu.component';
import {HeaderComponent} from './component/header/header.component';
import {EngineServiceModule} from './service/engine-service.module';
import {EngineService} from './service/engine.service';
import {OverviewModule} from './overview/overview.module';
import {TaskComponent} from "./ingestion/component/task/task.component";
import {SupervisorComponent} from "./ingestion/component/supervisor/supervisor.component";
import {WorkerComponent} from "./ingestion/component/worker/worker.component";
import {WorkerDetailComponent} from "./ingestion/component/worker/worker-detail.component";
import {DataStorageCriteriaModule} from "../data-storage/data-storage-criteria.module";
import IngestionContentType = Engine.IngestionContentType;

const _routes = [
  {
    path: '',
    redirectTo: Engine.ContentType.OVERVIEW,
    pathMatch: 'full'
  },
  {
    path: Engine.ContentType.OVERVIEW,
    component: EngineMonitoringComponent,
    data: { 'type': Engine.ContentType.OVERVIEW }
  },
  {
    path: Engine.ContentType.INGESTION,
    redirectTo: 'ingestion/task',
    pathMatch: 'full'
  },
  {
    path: 'ingestion/task',
    component: EngineMonitoringComponent,
    data: {'type': Engine.ContentType.INGESTION, 'group': IngestionContentType.TASK}
  },
  {
    path: 'ingestion/supervisor',
    component: EngineMonitoringComponent,
    data: {'type': Engine.ContentType.INGESTION, 'group': IngestionContentType.SUPERVISOR}
  },
  {
    path: 'ingestion/worker',
    component: EngineMonitoringComponent,
    data: {'type': Engine.ContentType.INGESTION, 'group': IngestionContentType.REMOTE_WORKER}
  },
  { path: 'ingestion/worker/:host', component: WorkerDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    DataStorageCriteriaModule,
    OverviewModule,
    EngineServiceModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [
    EngineMonitoringComponent,
    DruidClusterInformationComponent,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderOptionComponent,
    IngestionComponent,
    QueryComponent,
    TaskComponent,
    SupervisorComponent,
    WorkerComponent,
    WorkerDetailComponent
  ],
  providers: [
    EngineService
  ]
})
export class EngineMonitoringModule {
}
