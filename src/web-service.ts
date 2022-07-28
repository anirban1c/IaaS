import { Names } from 'cdk8s';
import { IntOrString, KubeDeployment, KubeService } from 'cdk8s-plus-24/lib/imports/k8s';
import { Construct } from 'constructs';

export interface WebServiceOptions {
  /** The Docker image to use for this service. */
  readonly image: string; // docker image to use for this service

  /**
   * Number of replicas.
   * @default 1
   */
  readonly replicas?: number;

  /**
   * External port.
   * @default 80
   */
  readonly port?: number;

  /**
   * Internal port.
   * @default 8080
   */
  readonly containerPort?: number;
}

export class WebService extends Construct {
  constructor(scope: Construct, ns: string, options: WebServiceOptions) {
    super(scope, ns);

    const port = options.port || 80;
    const containerPort = options.containerPort || 8080;
    const label = { app: Names.toLabelValue(this) };
    const replicas = options.replicas ?? 1;

    new KubeService(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [{ port, targetPort: IntOrString.fromNumber(containerPort) }],
        selector: label,
      },
    });

    new KubeDeployment(this, 'deployment', {
      spec: {
        replicas,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'web',
                image: options.image,
                ports: [{ containerPort }],
              },
            ],
          },
        },
      },
    });
  }
}
