import React from 'react'

export interface TechItem {
  name: string
  iconSrc: string
  icon: React.ReactNode
}

function makeTechItem(name: string, iconSrc: string): TechItem {
  return {
    name,
    iconSrc,
    icon: (
      <img
        src={iconSrc}
        alt={name}
        className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-300"
        loading="lazy"
        draggable={false}
      />
    ),
  }
}

// Upper Row (matching user reference screenshot)
export const upperTechStack: TechItem[] = [
  makeTechItem('TypeScript', '/tech-icons/typescript.svg'),
  makeTechItem('Llama 3', '/tech-icons/llama3.svg'),
  makeTechItem('Mistral AI', '/tech-icons/mistral.svg'),
  makeTechItem('Ollama', '/tech-icons/ollama.svg'),
  makeTechItem('Perplexity', '/tech-icons/perplexity.svg'),
  makeTechItem('Anthropic', '/tech-icons/anthropic.svg'),
  makeTechItem('CrewAI', '/tech-icons/crewai.svg'),
  makeTechItem('DSPy', '/tech-icons/dspy.svg'),
  makeTechItem('AutoGen', '/tech-icons/autogen.svg'),
  makeTechItem('GPT-4o', '/tech-icons/gpt4o.svg'),
  makeTechItem('Claude 3.5', '/tech-icons/claude.svg'),
  makeTechItem('Gemini Pro', '/tech-icons/gemini.svg'),
  makeTechItem('Python', '/tech-icons/python.svg'),
  makeTechItem('PyTorch', '/tech-icons/pytorch.svg'),
  makeTechItem('LangChain', '/tech-icons/langchain.svg'),
  makeTechItem('DeepSeek', '/tech-icons/deepseek.svg'),
]

// Lower Row (matching user reference screenshot)
export const lowerTechStack: TechItem[] = [
  makeTechItem('Azure', '/tech-icons/azure.svg'),
  makeTechItem('GCP', '/tech-icons/gcp.svg'),
  makeTechItem('Pinecone', '/tech-icons/pinecone.svg'),
  makeTechItem('Qdrant', '/tech-icons/qdrant.svg'),
  makeTechItem('Milvus', '/tech-icons/milvus.svg'),
  makeTechItem('Weaviate', '/tech-icons/weaviate.svg'),
  makeTechItem('Datadog', '/tech-icons/datadog.svg'),
  makeTechItem('Confluent', '/tech-icons/confluent.svg'),
  makeTechItem('Terraform', '/tech-icons/terraform.svg'),
  makeTechItem('Docker', '/tech-icons/docker.svg'),
  makeTechItem('Kubernetes', '/tech-icons/kubernetes.svg'),
  makeTechItem('React', '/tech-icons/react.svg'),
  makeTechItem('PostgreSQL', '/tech-icons/postgresql.svg'),
  makeTechItem('AWS', '/tech-icons/aws.svg'),
  makeTechItem('vLLM', '/tech-icons/vllm.svg'),
  makeTechItem('Triton', '/tech-icons/triton.svg'),
]
