import * as cdk from 'cdk8s';
import { ServiceType } from 'cdk8s-plus-24';
import { Construct } from 'constructs';

//import * as config from 'yaml-config-ts';


export interface ELKOptions {
  readonly name: string; // Chart name
  readonly nodeGroup?: string; // master or point to a masterservice :TODO
  readonly namespace?: string;

  readonly replicas?: number;
  readonly labels?: {};
  readonly image?: string; // "docker.elastic.co/elasticsearch/elasticsearch:1.8"
  readonly serviceType?: string; // LoadBalancer or defaults to ClusterIP


}

export class ELKConstruct extends Construct {
  constructor(scope: Construct, id: string, options: ELKOptions) {
    super(scope, id);


    //const  env = new config.yamlConfig('config');
    const namespace = options.namespace ?? 'ns-elk';
    const serviceType = options.serviceType ?? ServiceType.CLUSTER_IP;
    const replicas = options.replicas ?? 1;
    const image = options.image ?? 'docker.elastic.co/elasticsearch/elasticsearch';
    //const labels = options.labels ?? { app: 'xxxxx-cdk8s-elk' };

    new cdk.Helm(this, 'xxxx-elk-helm', {
      chart: 'elastic/elasticsearch',
      releaseName: 'elk-cdk8s',


      values: {
        namespace: namespace,
        replicas: replicas,
        minimumMasterNodes: 1,
        //labels: labels,
        rbac: {
          create: true,
        },
        image: image,
        imagePullPolicy: 'Always',
        // have an ingress
        ingress: {
          enabled: true,
          host: ['localhost'],
        },

        service: {
          type: serviceType,
        },
        dashboards: {
          enabled: true,
        },

      },

    });


  }
}
