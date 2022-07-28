import * as cdk from 'cdk8s';
import { ServiceType } from 'cdk8s-plus-24';
import { Construct } from 'constructs';

//import * as config from 'yaml-config-ts';


export interface FluentBitOptions {
  readonly name: string; // Chart name
  readonly kind?: string; // DaemonSet or
  readonly labels?: string;
  readonly replicas?: number;
  readonly namespace?: string;
  readonly serviceType?: string; // LoadBalancer or defaults to ClusterIP


}

export class FluentBitConstruct extends Construct {
  constructor(scope: Construct, id: string, options: FluentBitOptions) {
    super(scope, id);


    //const  env = new config.yamlConfig('config');

    const replicas = options.replicas ?? 1;
    const kind = options.kind ?? 'DaemonSet';
    const namespace = options.namespace ?? 'ns-elk';
    const serviceType = options.serviceType ?? ServiceType.CLUSTER_IP;
    const labels = options.labels ?? { app: 'xxxxx-cdk8s-fluentbit' };


    new cdk.Helm(this, 'xxxx-fluent-bit-helm', {
      chart: 'fluent/fluent-bit',
      releaseName: 'fluentbitc-cdk8s',

      values: {
        kind: kind,
        namespace: namespace,
        replicas: replicas,
        labels: labels,
        rbac: {
          create: true,
        },
        image: {
          pullPolicy: 'Always',
        },
        service: {
          type: serviceType,
        },
        dashboards: {
          enabled: true,
        },
        ingress: {
          enabled: true,
          annotations: {
            'kubernetes.io/ingress.class': 'nginx',
          },
        },

      },

    });


  }
}
