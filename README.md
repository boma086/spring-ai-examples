# changelog(20250118)
spring-ai-examples/ai/ollama-local-setup
 - 切换模型到codellama
 - 下载ollama和模型codellama
 - 修改请求模型到codellama
 - 修改报错代码create方法

# Spring AI Examples

## Prerequisites

Create an account at OpenAI Signup and generate the security token at [API Keys](https://platform.openai.com/api-keys).

Spring AI (for OpenAI integration) expects a configuration property named 'spring.ai.openai.api-key' that we should set to the value of the API Key obtained in teh above step.

```
export SPRING_AI_OPENAI_API_KEY=<INSERT KEY HERE>
```

## Run the Project

```
./mvnw spring-boot:run
```
