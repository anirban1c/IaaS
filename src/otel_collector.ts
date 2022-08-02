//import * as cdk from 'cdk8s';
import { Size } from 'cdk8s';
import { ConfigMap, Cpu, Deployment, DeploymentStrategy, Service, LabelSelector } from 'cdk8s-plus-24';
import { Construct } from 'constructs';



//import * as config from 'yaml-config-ts';


export interface OtelCollectorOptions {
  readonly name: string; // Chart name
  readonly kind?: string; // DaemonSet or
  readonly labels?: string;
  readonly replicas?: number;
  readonly namespace?: string;
  readonly serviceType?: string; // LoadBalancer or defaults to ClusterIP

}


export class OtelCollectorConstruct extends Construct {
  constructor(scope: Construct, id: string, options: OtelCollectorOptions, collector_cm_data:{}) {
    super(scope, id);

    


    const namespace = options.namespace ?? 'ns-otel';

    // const replicas = options.replicas ?? 1;
    // const kind = options.kind ?? 'Deployment';    
    // const serviceType = options.serviceType ?? ServiceType.CLUSTER_IP;
    const labels = options.labels ?? { app: 'xxxxx-cdk8s-otel' };
    
    
    const ocm = new ConfigMap(this, id, {
      metadata: {
        name: 'configMap',
        label: labels,
        namespace: namespace,
      },
      
      data: collector_cm_data,
    });

    const dd = new Deployment(this, id, {
      metadata:{
        label: {
          app: 'xxxxx-cdk8s-otel',
          otel: 'xxxx-cdk8s-collector-pods'
        },
        namespace: namespace,
        annotations:{}
      },
      containers: [{
        name: 'otel-collector',
        image: 'otel/opentelemetry-collector:latest',
        // ports: [
        //   { name: 'http', containerPort: httpPort },
        //       ],
        
        resources: {          
          cpu: {
            limit:  Cpu.millis(500),
            request: Cpu.millis(100)
          },
          memory: {
            limit: Size.mebibytes(500),
            request: Size.mebibytes(500),  
          },

        }
      },],
      strategy: DeploymentStrategy.rollingUpdate(),
      // volumes: [
      //   name: 'otel-collector-cm-vol',
      //   configMap: {
      //     name: 'otel-collector-cm',
      //     items: [{
      //       key: ocm.name,
      //       path: 'otel-collector-cm.yaml'
      //     }
      //     ]
      //   },
      // ]
    });

    dd._toPodSpec().add

    const svc = new Service(this, id, {
      metadata: {
        label: labels,
        namespace: namespace,
        annotations:{}
      },
      selector: LabelSelector.of([{otel: 'xxxx-cdk8s-collector-pods'}]),
    });

    
  }

}