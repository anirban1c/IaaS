import * as cdk from 'cdk8s';
import { Construct } from 'constructs';

//import * as config from 'yaml-config-ts';


export interface MetricsServerOptions {
  readonly name: string; // Chart name

  readonly kind?: string; // DaemonSet or
  readonly labels?: string;
  readonly replicas?: number;
  readonly namespace?: string;
  readonly serviceType?: string; // LoadBalancer or defaults to ClusterIP


}

export class MetricsServerConstruct extends Construct {
  constructor(scope: Construct, id: string, override_values: any) {
    super(scope, id);


    //const  env = new config.yamlConfig('config');

    // const replicas = options.replicas ?? 1;
    // const namespace = options.namespace ?? 'ns-elk';
    // const serviceType = options.serviceType ?? ServiceType.CLUSTER_IP;
    // const labels = options.labels ?? { app: 'xxxxx-cdk8s-prometheus' };


    new cdk.Helm(this, 'xxxx-MetricsServer-helm', {
      chart: 'metrics-server/metrics-server',
      releaseName: 'metrics-server-cdk8s',

      values: override_values,

    });


  }
}
