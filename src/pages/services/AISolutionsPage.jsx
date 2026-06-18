import ServicePageLayout from '../../components/ServicePageLayout';
import SEO from '../../components/SEO';

const faqItems = [
  {
    q: 'What is RAG and why does it matter for enterprise AI?',
    a: 'RAG - Retrieval-Augmented Generation - is an architecture where an AI model retrieves relevant information from your own documents before generating a response. Instead of answering from general training data (which may be wrong, outdated or irrelevant to your domain), the model answers from your data, with citations you can verify. For enterprises, this means AI that gives accurate, source-backed answers about your products, policies, legal requirements or internal procedures - rather than plausible-sounding responses that may be wrong. For most practical enterprise AI applications, RAG produces substantially better results than a raw LLM.',
  },
  {
    q: 'What is the difference between a RAG system and a fine-tuned model?',
    a: 'RAG retrieves relevant information at query time - the model sees your documents as context when answering. Fine-tuning trains the model itself on domain-specific data, changing the weights so the model has deeper knowledge of that domain baked in. RAG is better when your knowledge base changes frequently (new documents, updated policies) or when you need traceable citations. Fine-tuning is better when you need the model to behave consistently in a specific style, format or domain where retrieval alone is insufficient. Most production enterprise AI systems use both: a fine-tuned model with a RAG layer on top.',
  },
  {
    q: 'How do you build an AI agent that actually works reliably?',
    a: 'Reliable agents require: a carefully scoped set of tools (what the agent can do), well-designed task decomposition (how complex tasks are broken into steps), explicit fallback handling for unexpected inputs, and human-in-the-loop checkpoints at appropriate stages. The failure mode for most agent prototypes is overly broad scope - the agent is asked to handle too many situations without enough guardrails. We design agents for narrow, well-defined task classes first, prove reliability in production, then expand scope incrementally based on observed failure modes.',
  },
  {
    q: 'Can you build AI that works with Indian regulatory data - GST, Income Tax?',
    a: 'Yes. We have built RAG systems trained on the CGST Act, CBIC circulars, Income Tax Act provisions and CBDT notifications. The same architecture applies to other Indian regulatory domains - SEBI regulations, labour law, FSSAI compliance, real estate regulations. The key requirement is access to the relevant primary source documents, which we help curate and maintain as part of the system.',
  },
  {
    q: 'What does AI development cost and how long does it take?',
    a: 'Project scope varies significantly, so ranges are wide. A production RAG system over a defined document corpus - from design through deployment and evaluation - typically takes six to twelve weeks and depends on the data preparation requirements, the complexity of the retrieval design and the integration surface. Agentic systems with multiple tools and business system integrations take longer. We provide fixed-scope proposals after a discovery conversation, so costs are defined before any commitment.',
  },
];

export default function AISolutionsPage() {
  return (
    <>
      <SEO
        title="AI Solutions"
        description="Enterprise AI solutions - RAG systems, agentic AI, LLM integration, custom model development and AI automation. Production-grade AI infrastructure built for reliability at scale."
        keywords="AI solutions, artificial intelligence, machine learning, RAG, retrieval augmented generation, LLM, agentic AI, AI automation, enterprise AI, TechBird"
        faqItems={faqItems}
        serviceSchema={{ name: 'AI Solutions', description: 'Custom AI/ML models, RAG systems, intelligent automation and predictive analytics.', category: 'AI Consulting' }}
      />
      <ServicePageLayout
      heroImage="/assets/ai-core.png"
      eyebrow="AI Solutions"
      title="Custom AI Systems for Enterprises That Need More Than a Chatbot"
      subtitle="We build the layer underneath - retrieval systems, agent orchestration, fine-tuned models and production-grade AI infrastructure that runs reliably at scale."
      breadcrumbLabel="AI Solutions"
      introParagraphs={[
        'Enterprise AI projects fail for predictable reasons. A general-purpose LLM connected to a company\'s documents produces confident answers that are wrong. An automation demo built in a controlled environment breaks when it encounters the variance of real operations. A proof of concept that impressed in a boardroom never makes it to production because the infrastructure was an afterthought.',
        'TechBird approaches AI engineering the same way we approach any production system. We design for the failure modes, build for the data that actually exists, and deploy to infrastructure that can handle the load. The result is AI that earns trust from the people who use it every day - not AI that needs to be explained away.',
      ]}
      sections={[
        {
          heading: 'Retrieval-Augmented Generation (RAG)',
          paragraphs: [
            'RAG is the architecture that makes AI useful for domain-specific enterprise applications. Rather than relying on a model\'s training data - which is general, dated and prone to hallucination on specific topics - a RAG system retrieves relevant documents from your own knowledge base and passes them to the model as context. The model answers based on your data, with citations.',
            'We build RAG pipelines for internal knowledge bases, legal research, product documentation, financial analysis and compliance functions. The design decisions - chunking strategy, embedding model selection, vector database choice, retrieval evaluation - matter enormously to the quality of results, and we work through them systematically rather than applying a default template.',
          ],
          useCases: 'Internal knowledge retrieval, legal research, customer support augmentation, compliance question answering, product documentation search.',
        },
        {
          heading: 'Agentic AI Systems',
          paragraphs: [
            'Agentic AI refers to AI systems that can take multi-step actions autonomously - calling tools, querying databases, making decisions across a sequence of steps, and completing complex tasks with minimal human intervention. Building reliable agents requires careful design of the tool set, the task decomposition, the fallback logic and the human-in-the-loop boundaries.',
            'We build agentic systems for workflow automation, research and synthesis tasks, data pipeline orchestration and business process automation. We work primarily with the Anthropic Claude API and OpenAI\'s API, and advise on model selection based on the latency, cost and accuracy requirements of each application.',
          ],
          useCases: 'Document processing pipelines, automated research and summarisation, workflow orchestration across business systems, AI-assisted code review, customer data enrichment.',
        },
        {
          heading: 'LLM Integration & Custom Model Development',
          paragraphs: [
            'Connecting an existing LLM to your product is often straightforward. Making it work reliably - with appropriate latency, cost and quality for your use case - requires careful prompt engineering, context management, output validation and evaluation. For use cases where a general model is insufficient, fine-tuning on domain-specific data produces materially better results.',
            'We handle the full integration lifecycle: API integration, prompt engineering and optimisation, output validation pipelines, evaluation frameworks and monitoring. For specialised domains, we scope fine-tuning engagements based on the available training data and the performance delta required.',
          ],
        },
        {
          heading: 'AI Automation & Process Integration',
          paragraphs: [
            'AI capabilities become valuable when they are embedded in the workflows people actually use - not in separate tools that require users to context-switch. We integrate AI into ERPNext workflows, web applications, customer communication systems and internal business tools, so the intelligence is where the work happens.',
          ],
        },
      ]}
      stackTitle="We work across the major API providers and open-source foundations"
      stackItems={[
        { label: 'Models', tech: 'Anthropic Claude, OpenAI GPT, Mistral, Llama (open-source, on-premise)' },
        { label: 'Vector Databases', tech: 'Pinecone, Qdrant, Weaviate, pgvector' },
        { label: 'Orchestration', tech: 'LangChain, LlamaIndex, custom Python pipelines' },
        { label: 'Infrastructure', tech: 'AWS (Lambda, EC2, ECS), Docker, Kubernetes' },
      ]}
      faqItems={faqItems}
      ctaHeading="Start an AI Project"
      ctaText="Tell us about your use case. We will tell you whether AI is the right approach - and what it takes to build it properly."
    />
    </>
  );
}
