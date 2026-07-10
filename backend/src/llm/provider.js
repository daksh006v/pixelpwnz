import config from '../config.js';

// OpenAI implementation removed

async function generateOllama(systemPrompt, userPrompt, temperature) {
  const response = await fetch(`${config.ollama.baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.ollama.model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature,
      stream: false,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama API error (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    reply: (data.response || '').trim(),
    provider: 'ollama',
    usage: {
      prompt_tokens: data.prompt_eval_count || 0,
      completion_tokens: data.eval_count || 0,
      total_tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
    },
  };
}

async function generateGroq(systemPrompt, userPrompt, temperature) {
  const apiKey = config.groq?.apiKey;
  if (!apiKey) throw new Error('GROQ_API_KEY not configured');

  const model = config.groq?.model || 'llama-3.1-8b-instant';

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: 150,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    reply: data.choices?.[0]?.message?.content?.trim() || '',
    provider: 'groq',
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
    },
  };
}

/**
 * Hybrid LLM provider — tries local Ollama first, falls back to cloud.
 * Priority: Ollama (free, local) → Groq (free, ultra-fast)
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} [temperature=0.7]
 * @returns {Promise<{ reply: string, provider: string, usage: object }>}
 */
export async function generateReply(systemPrompt, userPrompt, temperature = 0.7) {
  const errors = [];

  // 1. Try Ollama (local, free, fastest)
  try {
    return await generateOllama(systemPrompt, userPrompt, temperature);
  } catch (err) {
    errors.push(`Ollama: ${err.message}`);
  }

  // 2. Try Groq (cloud, free tier, ultra-fast)
  if (config.groq?.apiKey) {
    try {
      return await generateGroq(systemPrompt, userPrompt, temperature);
    } catch (err) {
      errors.push(`Groq: ${err.message}`);
    }
  }

  throw new Error(`All LLM providers failed:\n${errors.join('\n')}`);
}
