package com.howtodoinjava.ai.demo.web;

import static org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY;

import com.howtodoinjava.ai.demo.web.model.Answer;
import com.howtodoinjava.ai.demo.web.model.Question;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.PromptChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

  private final ChatClient chatClient;

  public ChatController(ChatClient.Builder chatClientBuilder, VectorStore vectorStore) {

    this.chatClient = chatClientBuilder
      .defaultAdvisors(
        new SimpleLoggerAdvisor(),
        new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()),
        new PromptChatMemoryAdvisor(new InMemoryChatMemory()))
      .build();
  }

  @PostMapping
  public Answer chat(@RequestBody Question question, Authentication user) {
    return chatClient.prompt()
      .user(question.question())
      .advisors(
        advisorSpec -> advisorSpec.param(CHAT_MEMORY_CONVERSATION_ID_KEY, user.getPrincipal()))
      .call()
      .entity(Answer.class);
  }
}
