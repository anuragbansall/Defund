import Groq from 'groq-sdk';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env) {
		// CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		try {
			// Validate API key
			if (!env.GROQ_API_KEY) {
				return new Response('AI service is not configured', {
					status: 500,
					headers: corsHeaders,
				});
			}

			// Only allow POST
			if (request.method !== 'POST') {
				return new Response('Method Not Allowed', {
					status: 405,
					headers: corsHeaders,
				});
			}

			const url = new URL(request.url);
			if (url.pathname !== '/enhance-campaign') {
				return new Response('Not Found', {
					status: 404,
					headers: corsHeaders,
				});
			}

			// Parse body safely
			let body;
			try {
				body = await request.json();
			} catch {
				return new Response('Invalid JSON body', {
					status: 400,
					headers: corsHeaders,
				});
			}

			console.log('Received body:', body);

			const { title, description, category, targetEth, deadline } = body;

			if (!title || !description) {
				console.error('Missing title or description in request body');
				return new Response('Invalid input', {
					status: 400,
					headers: corsHeaders,
				});
			}

			// Initialize Groq client
			const groq = new Groq({
				apiKey: env.GROQ_API_KEY,
			});

			// Human-first prompt
			const prompt = `
You are helping a real person write a crowdfunding campaign.

Rewrite the title and description to be:
- Simple
- Honest
- Human
- Short and clear
- Easy to understand
- No buzzwords
- No marketing language

Funding goal: ${targetEth} ETH
Deadline: ${new Date(deadline).toDateString()}

Original Title:
"${title}"

Original Description:
"${description}"

Rules:
- Title must be short (max 10–12 words)
- Description must be 2–3 short paragraphs
- Use plain English
- Focus on why help is needed and what the money is for

Return ONLY valid JSON in this exact format:
{
  "enhancedTitle": "...",
  "enhancedDescription": "..."
}
`;

			// Call Groq
			const completion = await groq.chat.completions.create({
				model: 'openai/gpt-oss-20b',
				messages: [
					{
						role: 'system',
						content: 'You rewrite crowdfunding text clearly and simply.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				response_format: {
					type: 'json_schema',
					json_schema: {
						name: 'CampaignEnhancement',
						strict: true,
						schema: {
							type: 'object',
							properties: {
								enhancedTitle: { type: 'string' },
								enhancedDescription: { type: 'string' },
							},
							required: ['enhancedTitle', 'enhancedDescription'],
							additionalProperties: false,
						},
					},
				},
				temperature: 0.4,
			});

			const text = completion.choices?.[0]?.message?.content;

			console.log('AI response text:', text);

			if (!text) {
				throw new Error('Empty AI response');
			}

			const result = JSON.parse(text);

			console.log('Enhanced result:', result);

			return new Response(JSON.stringify(result), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders,
				},
			});
		} catch (error) {
			console.error('AI Worker Error:', error);

			return new Response(
				JSON.stringify({
					error: 'AI service is temporarily unavailable. Please try again later.',
				}),
				{
					status: 503,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				},
			);
		}
	},
};
