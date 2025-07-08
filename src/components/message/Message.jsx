import React from 'react';
import './message.css';

const Message = ({ content, role, isStreaming }) => {
  // Función para renderizar markdown básico
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    // Dividir el texto en partes (código y texto normal)
    const parts = [];
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    
    let lastIndex = 0;
    let match;
    
    // Procesar bloques de código
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Agregar texto antes del bloque de código
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        parts.push(
          <span key={`text-${parts.length}`}>
            {renderInlineElements(beforeText)}
          </span>
        );
      }
      
      // Agregar bloque de código
      const language = match[1] || '';
      const code = match[2].trim();
      parts.push(
        <div key={`code-${parts.length}`} className="code-block">
          <div className="code-header">
            <span className="code-language">{language || 'código'}</span>
            <button 
              className="copy-button"
              onClick={() => copyToClipboard(code)}
              title="Copiar código"
            >
              📋
            </button>
          </div>
          <pre className="code-content">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Agregar texto restante
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      parts.push(
        <span key={`text-${parts.length}`}>
          {renderInlineElements(remainingText)}
        </span>
      );
    }
    
    return parts.length > 0 ? parts : renderInlineElements(text);
  };
  
  // Función para renderizar elementos inline (negritas, cursivas, código inline)
  const renderInlineElements = (text) => {
    const parts = [];
    const inlineCodeRegex = /`([^`]+)`/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const listRegex = /^\* (.+)$/gm;
    
    let processedText = text;
    
    // Procesar listas
    processedText = processedText.replace(listRegex, (match, item) => {
      return `• ${item}`;
    });
    
    // Dividir por líneas para manejar saltos de línea
    const lines = processedText.split('\n');
    
    return lines.map((line, lineIndex) => {
      const lineParts = [];
      let lastIndex = 0;
      
      // Procesar código inline
      let match;
      const inlineCodeMatches = [...line.matchAll(inlineCodeRegex)];
      
      inlineCodeMatches.forEach((match, index) => {
        // Texto antes del código
        if (match.index > lastIndex) {
          const beforeText = line.slice(lastIndex, match.index);
          lineParts.push(renderTextFormatting(beforeText, `before-${lineIndex}-${index}`));
        }
        
        // Código inline
        lineParts.push(
          <code key={`inline-${lineIndex}-${index}`} className="inline-code">
            {match[1]}
          </code>
        );
        
        lastIndex = match.index + match[0].length;
      });
      
      // Texto restante
      if (lastIndex < line.length) {
        const remainingText = line.slice(lastIndex);
        lineParts.push(renderTextFormatting(remainingText, `remaining-${lineIndex}`));
      }
      
      return (
        <span key={`line-${lineIndex}`}>
          {lineParts.length > 0 ? lineParts : renderTextFormatting(line, `line-${lineIndex}`)}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };
  
  // Función para renderizar negritas y cursivas
  const renderTextFormatting = (text, key) => {
    const parts = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;
    
    let processedText = text;
    let lastIndex = 0;
    
    // Procesar negritas primero
    const boldMatches = [...processedText.matchAll(boldRegex)];
    boldMatches.forEach((match, index) => {
      if (match.index > lastIndex) {
        const beforeText = processedText.slice(lastIndex, match.index);
        parts.push(beforeText);
      }
      
      parts.push(
        <strong key={`bold-${key}-${index}`}>
          {match[1]}
        </strong>
      );
      
      lastIndex = match.index + match[0].length;
    });
    
    // Agregar texto restante
    if (lastIndex < processedText.length) {
      parts.push(processedText.slice(lastIndex));
    }
    
    return parts.length > 1 ? parts : text;
  };
  
  // Función para copiar código al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Podrías agregar una notificación aquí
      console.log('Código copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  };
  
  return (
    <div className={`message ${role}`}>
      <div className="message-content">
        {renderMarkdown(content)}
        {isStreaming && <span className="typing-indicator">▋</span>}
      </div>
    </div>
  );
};

export default Message;