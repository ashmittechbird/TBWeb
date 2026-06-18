import ServicePageLayout from '../../components/ServicePageLayout';
import SEO from '../../components/SEO';

const faqItems = [
  {
    q: 'Which cloud provider do you recommend?',
    a: 'AWS is our primary recommendation for most enterprise workloads - it has the broadest service catalogue, the strongest ecosystem and the most mature compliance certifications. Google Cloud is excellent for data and ML workloads. Azure is the natural choice when your organisation is already invested in the Microsoft ecosystem. For cost-sensitive workloads, Hetzner and DigitalOcean offer excellent price-performance. We advise based on your specific requirements, not vendor preference.',
  },
  {
    q: 'What does a cloud migration actually involve?',
    a: 'A proper cloud migration involves: discovery and dependency mapping of your current environment; migration strategy selection (rehost, re-platform or refactor); network design and VPC architecture in the target environment; staged migration with parallel running; cutover planning and rollback procedures; post-migration optimisation and team training. The most common mistake is treating it as a copy-paste exercise. It is an engineering project.',
  },
  {
    q: 'How do you handle downtime during migration?',
    a: 'For most applications, migration downtime can be reduced to a maintenance window of minutes with proper planning. We use database replication, application-level data sync and load balancer cutover to transition traffic with minimal interruption. For applications that require zero downtime, we design active-active configurations that allow live migration without any service interruption.',
  },
  {
    q: 'Do you manage infrastructure on an ongoing basis?',
    a: 'Yes. We offer managed infrastructure services covering 24/7 monitoring, incident response, security patching, Kubernetes version upgrades, cost optimisation and capacity planning. Many clients engage us to design and build their infrastructure, then retain us for ongoing management. SLAs are defined per engagement based on criticality.',
  },
];

export default function CloudDevOpsPage() {
  return (
    <>
      <SEO
        title="Cloud & DevOps"
        description="Cloud infrastructure and DevOps services - cloud migration, CI/CD pipelines, Kubernetes orchestration, cloud security, compliance and cost optimisation. 99.9% uptime SLA on managed infrastructure."
        keywords="cloud computing, DevOps, CI/CD, cloud migration, Kubernetes, AWS, Azure, Google Cloud, infrastructure as code, cloud security, TechBird"
        faqItems={faqItems}
        serviceSchema={{ name: 'Cloud & DevOps', description: 'AWS/Azure/GCP infrastructure, CI/CD pipelines, Kubernetes, monitoring and security.', category: 'Cloud Computing' }}
      />
      <ServicePageLayout
      accentColor="#34d399"
      eyebrow="Cloud & DevOps"
      title="Cloud Infrastructure That Scales Without Breaking the Budget"
      subtitle="Designing and managing robust cloud environments - migration, DevOps pipelines, Kubernetes, security and cost optimisation - so your team can ship faster."
      breadcrumbLabel="Cloud & DevOps"
      metrics={[
        { number: '99.9%', label: 'Uptime SLA on managed infrastructure' },
        { number: '60%', label: 'Average cost reduction post-migration' },
        { number: '100+', label: 'Cloud environments designed and managed' },
      ]}
      introParagraphs={[
        'Cloud infrastructure is not a checkbox - it is the foundation everything else runs on. A misconfigured VPC costs you a security breach. An unoptimised instance type costs you thousands per month. A manual deployment process costs you hours of downtime every release cycle. Yet most companies treat infrastructure as an afterthought until something breaks at 2 AM.',
        'TechBird designs cloud infrastructure the way experienced engineers build production systems - with failure modes mapped, costs tracked and processes automated. Your infrastructure should be boring: reliable, predictable and not something you think about unless you choose to.',
      ]}
      sections={[
        {
          icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
          color: '#34d399',
          heading: 'Cloud Migration',
          paragraphs: [
            'Moving from on-premise servers or legacy hosting to the cloud requires more than lifting and shifting VMs. We start with a thorough assessment of your current infrastructure, applications and data dependencies. We then design a migration strategy - rehost, re-platform or refactor - that minimises downtime and risk.',
          ],
          useCases: 'Data centre exit, Legacy app modernisation, Hybrid cloud, Disaster recovery, Compliance migration',
        },
        {
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
          color: '#38bdf8',
          heading: 'DevOps & CI/CD Pipelines',
          paragraphs: [
            'Manual deployment processes are a source of outages, not a safety mechanism. We design and implement CI/CD pipelines using GitHub Actions, GitLab CI and Jenkins - so every code change is automatically tested, validated and deployed. We instrument pipelines with rollback triggers and monitoring hooks so problems surface before users do.',
          ],
          useCases: 'CI/CD implementation, Automated testing integration, Blue-green deployments, Rollback pipelines, GitOps',
        },
        {
          icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
          color: '#a78bfa',
          heading: 'Kubernetes & Container Orchestration',
          paragraphs: [
            'Kubernetes enables consistent, scalable deployment of containerised workloads across any cloud or on-premise environment. We design Kubernetes clusters with proper node pools, namespace isolation, RBAC policies, resource limits and autoscaling. We deploy Helm charts for repeatable application deployments and maintain clusters through version upgrades and security patching.',
          ],
          useCases: 'K8s cluster design, Helm chart management, Autoscaling, Multi-cloud deployments, Service mesh',
        },
        {
          icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
          color: '#fbbf24',
          heading: 'Cloud Security & Compliance',
          paragraphs: [
            'Security misconfigurations are the leading cause of cloud breaches. We conduct comprehensive cloud security audits - IAM policy review, network security group analysis, encryption at rest and in transit, secret management and compliance mapping. For regulated industries, we design infrastructure that meets SOC 2, ISO 27001, HIPAA and PCI-DSS requirements.',
          ],
          useCases: 'Security audits, IAM hardening, SOC 2 readiness, Secrets management, VPC design',
        },
        {
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          color: '#f472b6',
          heading: 'Cost Optimisation & FinOps',
          paragraphs: [
            'Cloud bills grow faster than awareness of what is driving them. We perform cost audits that identify waste - idle instances, oversized reservations, orphaned resources, inefficient data transfer - and implement rightsizing, reserved instance strategies and autoscaling policies. Clients consistently see 30–60% cost reductions within the first 90 days.',
          ],
          useCases: 'Cost audits, Reserved instance planning, Rightsizing, FinOps dashboards, Budget alerts',
        },
      ]}
      stackTitle="Infrastructure platforms and tools we work with daily"
      stackItems={[
        { label: 'Cloud Providers', tech: 'AWS, Google Cloud, Azure, DigitalOcean, Hetzner' },
        { label: 'Containers & Orchestration', tech: 'Docker, Kubernetes, Helm, ECS, EKS, GKE' },
        { label: 'CI/CD', tech: 'GitHub Actions, GitLab CI, Jenkins, ArgoCD, Terraform' },
        { label: 'Monitoring', tech: 'Prometheus, Grafana, Datadog, New Relic, CloudWatch' },
        { label: 'Security', tech: 'Vault, AWS IAM, Trivy, OWASP, CIS Benchmarks' },
        { label: 'Infrastructure as Code', tech: 'Terraform, Pulumi, Ansible, CloudFormation' },
      ]}
      faqItems={faqItems}
      ctaHeading="Build Infrastructure That Lasts"
      ctaText="Tell us about your current setup and where you want to be. We will design the right architecture and manage the migration with minimal disruption."
    />
    </>
  );
}
