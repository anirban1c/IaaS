import * as cdk from 'cdk8s';
import { Construct } from 'constructs';

//import * as config from 'yaml-config-ts';


export class GrafanaConstruct extends Construct {
  constructor(scope: Construct, id: string, override_values: any) {
    super(scope, id);

    new cdk.Helm(this, 'xxxx-Grafana-helm', {
      chart: 'grafana/grafana',
      releaseName: 'grafana-cdk8s',

      values: override_values,

    });


  }
}
