import { App, Chart, ChartProps } from 'cdk8s';
import * as kplus from 'cdk8s-plus-24';
import { Construct } from 'constructs';


import { ELKConstruct } from './elk';
import { FluentBitConstruct } from './fluentbit';
import { GrafanaConstruct } from './grafana';
import { MetricsServerConstruct } from './metric-server';
import { PrometheusConstruct } from './prometheus';
import Utils from './utils';


export class NSChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new kplus.Namespace(this, 'xxxxx-ns', {
      metadata: {
        name: 'ns-anirban-ffff',

      },

    });

  }
};


export class FBChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new FluentBitConstruct(this, 'yyy-fluentbit', {
      name: 'ns-anirban-ffff',
      replicas: 3,
    });
  }
};


export class ELKChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new ELKConstruct(this, 'yyy-elastic', {
      name: 'ns-anirban-ffff',
      replicas: 1,
      nodeGroup: 'master',
      labels: { app: 'ddd-ff' },
      namespace: 'anirban-ffff',
    });


  }
};


export class PromChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);


    const values = Utils.loadYaml('../src/prom_values.yaml');

    new PrometheusConstruct(this, 'yyy-prometheus', values);


  }
};


export class GrafanaChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);


    const values = Utils.loadYaml('../src/grafana_values.yaml');

    new GrafanaConstruct(this, 'yyy-grafana', values);


  }
};

export class MetricsServerChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);


    const values = Utils.loadYaml('../src/metrics-server-values.yaml');

    new MetricsServerConstruct(this, 'yyy-Metrics-Server', values);


  }
};

const app = new App();
const ns = new NSChart(app, 'ns-anirban-xxx');
//const ms = new MetricsServerChart(app, 'xxx-Metrics-Server');
const fb = new FBChart(app, 'FluentBit');
const elk = new ELKChart(app, 'ELK');

new PromChart(app, 'Prometheus');
new GrafanaChart(app, 'Grafana');

//ns.addDependency(ms);
ns.addDependency(fb);
fb.addDependency(elk);


app.synth();
