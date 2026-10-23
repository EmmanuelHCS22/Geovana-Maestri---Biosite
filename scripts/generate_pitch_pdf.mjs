import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePitchPdf() {
  const pdfDoc = await PDFDocument.create();

  // Standard A4 dimensions in points: 595.28 x 841.89
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;

  // Colors
  const roseSoft = rgb(0.843, 0.502, 0.588); // #d78096
  const roseDark = rgb(0.541, 0.235, 0.314); // #8a3c50
  const roseBg = rgb(0.984, 0.957, 0.965);   // #fbf4f6
  const roseLight = rgb(0.969, 0.918, 0.929); // #f7eaed
  const textDark = rgb(0.169, 0.153, 0.157); // #2b2728
  const textMuted = rgb(0.42, 0.38, 0.40);
  const white = rgb(1, 1, 1);
  const cardBorder = rgb(0.92, 0.82, 0.84);
  const goldAccent = rgb(0.83, 0.65, 0.42);

  // Fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontTimesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // Load available images
  let heroImg = null;
  let aboutImg = null;
  let portraitImg = null;

  try {
    const heroPath = path.resolve('public/assets/aistudio/Screenshot_2026-10-20-15-55-32-00_40deb401b9ffe8e1df2f1cc5ba480b12_b90356bb.jpg');
    if (fs.existsSync(heroPath)) {
      const heroBytes = fs.readFileSync(heroPath);
      heroImg = await pdfDoc.embedJpg(heroBytes);
    }
  } catch (e) {
    console.error('Error loading heroImg:', e);
  }

  try {
    const aboutPath = path.resolve('public/assets/aistudio/Screenshot_2026-10-20-15-55-37-48_40deb401b9ffe8e1df2f1cc5ba480b12_a318aa2c.jpg');
    if (fs.existsSync(aboutPath)) {
      const aboutBytes = fs.readFileSync(aboutPath);
      aboutImg = await pdfDoc.embedJpg(aboutBytes);
    }
  } catch (e) {
    console.error('Error loading aboutImg:', e);
  }

  try {
    const portraitPath = path.resolve('public/assets/aistudio/IMG_20261020_143006_bcc80033.jpg');
    if (fs.existsSync(portraitPath)) {
      const portraitBytes = fs.readFileSync(portraitPath);
      portraitImg = await pdfDoc.embedJpg(portraitBytes);
    }
  } catch (e) {
    console.error('Error loading portraitImg:', e);
  }

  // Helper: Draw Header Bar
  const drawPageHeader = (page, pageNum, pageTitle) => {
    // Header line
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 45,
      width: PAGE_WIDTH - 80,
      height: 1,
      color: cardBorder,
    });
    // Brand title
    page.drawText('GEOVANA MAESTRI · PROPOSTA DE BIOSITE EXCLUSIVO', {
      x: 40,
      y: PAGE_HEIGHT - 38,
      size: 8.5,
      font: fontBold,
      color: roseDark,
    });
    // Section title
    page.drawText(pageTitle.toUpperCase(), {
      x: PAGE_WIDTH - 40 - fontBold.widthOfTextAtSize(pageTitle.toUpperCase(), 8.5),
      y: PAGE_HEIGHT - 38,
      size: 8.5,
      font: fontBold,
      color: textMuted,
    });

    // Footer line
    page.drawRectangle({
      x: 40,
      y: 42,
      width: PAGE_WIDTH - 80,
      height: 1,
      color: cardBorder,
    });
    page.drawText('Apresentação Comercial & Demonstração de Estrutura Digital', {
      x: 40,
      y: 30,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });
    const pageStr = `Página ${pageNum} de 4`;
    page.drawText(pageStr, {
      x: PAGE_WIDTH - 40 - fontRegular.widthOfTextAtSize(pageStr, 8),
      y: 30,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });
  };

  // =========================================================================
  // PAGE 1: CAPA DE ALTO IMPACTO (COVER)
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Background fill
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: roseBg,
    });

    // Decorative top gradient accent bar
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 12,
      width: PAGE_WIDTH,
      height: 12,
      color: roseSoft,
    });

    // Decorative outer border
    page.drawRectangle({
      x: 28,
      y: 28,
      width: PAGE_WIDTH - 56,
      height: PAGE_HEIGHT - 56,
      borderColor: cardBorder,
      borderWidth: 1.5,
      color: white,
    });

    // Top pill badge
    page.drawRectangle({
      x: 52,
      y: PAGE_HEIGHT - 75,
      width: 250,
      height: 24,
      color: roseLight,
      borderColor: roseSoft,
      borderWidth: 0.8,
    });
    page.drawText('APRESENTAÇÃO DE PROJETO DIGITAL', {
      x: 62,
      y: PAGE_HEIGHT - 67,
      size: 9,
      font: fontBold,
      color: roseDark,
    });

    // Big Title
    page.drawText('Biosite Profissional de Luxo', {
      x: 52,
      y: PAGE_HEIGHT - 120,
      size: 28,
      font: fontTimes,
      color: textDark,
    });

    page.drawText('Desenvolvido exclusivamente para a marca', {
      x: 54,
      y: PAGE_HEIGHT - 144,
      size: 13,
      font: fontRegular,
      color: textMuted,
    });

    page.drawText('Geovana Maestri', {
      x: 54,
      y: PAGE_HEIGHT - 180,
      size: 30,
      font: fontTimesItalic,
      color: roseDark,
    });

    page.drawText('CÍLIOS  ·  SOBRANCELHAS  ·  CURSOS PROFISSIONALIZANTES', {
      x: 55,
      y: PAGE_HEIGHT - 200,
      size: 9,
      font: fontBold,
      color: roseSoft,
    });

    // Embed Portrait Image or Hero Image
    const coverImage = portraitImg || heroImg;
    if (coverImage) {
      // Photo container frame
      const imgWidth = 230;
      const imgHeight = 310;
      const imgX = PAGE_WIDTH - 52 - imgWidth;
      const imgY = PAGE_HEIGHT - 430;

      // Shadow / border frame
      page.drawRectangle({
        x: imgX - 6,
        y: imgY - 6,
        width: imgWidth + 12,
        height: imgHeight + 12,
        color: roseLight,
        borderColor: cardBorder,
        borderWidth: 1.5,
      });

      page.drawImage(coverImage, {
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: imgHeight,
      });

      // Overlay signature text
      page.drawRectangle({
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: 38,
        color: rgb(0.12, 0.1, 0.11),
      });
      page.drawText('Geovana Maestri', {
        x: imgX + 15,
        y: imgY + 18,
        size: 13,
        font: fontTimesItalic,
        color: white,
      });
      page.drawText('Lash Designer & Instrutora', {
        x: imgX + 15,
        y: imgY + 7,
        size: 8,
        font: fontRegular,
        color: roseLight,
      });
    }

    // Left info card
    const cardY = PAGE_HEIGHT - 430;
    const cardWidth = 220;
    page.drawRectangle({
      x: 52,
      y: cardY,
      width: cardWidth,
      height: 210,
      color: roseBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    page.drawText('OBJETIVO DO PROJETO', {
      x: 66,
      y: cardY + 182,
      size: 9.5,
      font: fontBold,
      color: roseDark,
    });

    const introText = [
      'Substituir links genéricos por um',
      'site elegante, próprio e de alto',
      'impacto que transmite autoridade,',
      'apresenta seu catálogo de cílios,',
      'valoriza seus cursos e converte',
      'seguidoras do Instagram em',
      'agendamentos imediatos.',
    ];
    let ty = cardY + 160;
    for (const line of introText) {
      page.drawText(line, {
        x: 66,
        y: ty,
        size: 9.5,
        font: fontRegular,
        color: textDark,
      });
      ty -= 15;
    }

    // 3 Feature Pills on cover bottom
    const features = [
      { title: 'Agendamento Direto no WhatsApp', desc: 'Cliente escolhe o procedimento e a data em 1 toque' },
      { title: 'Catálogo & Valores Transparentes', desc: 'Reduz dúvidas repetitivas e atrai clientes qualificadas' },
      { title: 'Captação para o Curso Lash', desc: 'Espaço nobre para divulgar turmas e mentorias' },
    ];

    let fy = 175;
    for (const f of features) {
      page.drawRectangle({
        x: 52,
        y: fy,
        width: PAGE_WIDTH - 104,
        height: 38,
        color: roseLight,
        borderColor: cardBorder,
        borderWidth: 0.8,
      });

      // Small accent circle
      page.drawCircle({
        x: 72,
        y: fy + 19,
        size: 7,
        color: roseSoft,
      });

      page.drawText(f.title, {
        x: 90,
        y: fy + 21,
        size: 11,
        font: fontBold,
        color: roseDark,
      });

      page.drawText(f.desc, {
        x: 90,
        y: fy + 9,
        size: 9,
        font: fontRegular,
        color: textDark,
      });

      fy -= 46;
    }

    // Bottom note
    page.drawText('PROPOSTA COMERCIAL & PORTFÓLIO DE DEMONSTRAÇÃO · 100% PERSONALIZADO', {
      x: 52,
      y: 46,
      size: 8,
      font: fontBold,
      color: textMuted,
    });
  }

  // =========================================================================
  // PAGE 2: ESTRUTURA VISUAL DO BIOSITE & TELAS
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawPageHeader(page, 2, 'Estrutura & Identidade Visual');

    // Section Title
    page.drawText('Design Elegante, Feminino & Fiel à sua Essência', {
      x: 40,
      y: PAGE_HEIGHT - 75,
      size: 18,
      font: fontTimes,
      color: textDark,
    });
    page.drawText('Layout construído nos tons rosé (#f7eaed e #d78096) com tipografia de luxo e navegação intuitiva.', {
      x: 40,
      y: PAGE_HEIGHT - 92,
      size: 10,
      font: fontRegular,
      color: textMuted,
    });

    // Mockup frame of the actual biosite
    const mockWidth = 230;
    const mockHeight = 440;
    const mockX = 40;
    const mockY = PAGE_HEIGHT - 550;

    // Phone casing mockup
    page.drawRectangle({
      x: mockX - 8,
      y: mockY - 8,
      width: mockWidth + 16,
      height: mockHeight + 16,
      color: rgb(0.15, 0.14, 0.15), // Dark phone bezel
      borderColor: cardBorder,
      borderWidth: 1.5,
    });

    if (heroImg) {
      page.drawImage(heroImg, {
        x: mockX,
        y: mockY,
        width: mockWidth,
        height: mockHeight,
      });
    }

    // Phone Speaker notch indicator
    page.drawRectangle({
      x: mockX + (mockWidth / 2) - 25,
      y: mockY + mockHeight + 2,
      width: 50,
      height: 4,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Right side: Sections Breakdown
    const rightX = mockX + mockWidth + 24;
    const rightW = PAGE_WIDTH - rightX - 40;

    page.drawText('Módulos Criados no Site:', {
      x: rightX,
      y: PAGE_HEIGHT - 120,
      size: 13,
      font: fontBold,
      color: roseDark,
    });

    const modules = [
      {
        num: '01',
        title: 'Topo de Impacto (Full Bleed)',
        desc: 'Sua foto em destaque total no topo com o seu nome "Geovana Maestri" sobreposto e assinatura "Cílios · Sobrancelha · Curso". Transmite autoridade imediata a quem abre o link.',
      },
      {
        num: '02',
        title: 'Menu de Ação Rápida (4 Botões Nobres)',
        desc: 'Botões em cards estilizados:\n1. Agendamento / Reserve seu horário\n2. Curso Lash / Especialização profissional\n3. Catálogo / Procedimentos e valores\n4. Avalie sua experiência / Feedback e depoimentos',
      },
      {
        num: '03',
        title: 'Seção "Sobre Mim" Personalizada',
        desc: 'Sua história e posicionamento profissional integrados com a sua foto real em meio à natureza, criando conexão e empatia com as clientes.',
      },
      {
        num: '04',
        title: 'Vitrine de Serviços & Especialidades',
        desc: 'Apresentação detalhada das suas 3 principais frentes com ícones finos em contorno circular: Extensões de Cílios, Lash Lifting e Cursos.',
      },
      {
        num: '05',
        title: 'Perguntas Frequentes (FAQ Acordeão)',
        desc: 'Responde dúvidas comuns (durabilidade dos cílios, cuidados pós-procedimento e formas de pagamento), economizando tempo no WhatsApp.',
      },
    ];

    let modY = PAGE_HEIGHT - 145;
    for (const m of modules) {
      page.drawRectangle({
        x: rightX,
        y: modY - 48,
        width: rightW,
        height: 58,
        color: roseBg,
        borderColor: cardBorder,
        borderWidth: 0.8,
      });

      // Number badge
      page.drawRectangle({
        x: rightX + 8,
        y: modY - 32,
        width: 24,
        height: 24,
        color: roseSoft,
      });
      page.drawText(m.num, {
        x: rightX + 13,
        y: modY - 24,
        size: 9.5,
        font: fontBold,
        color: white,
      });

      page.drawText(m.title, {
        x: rightX + 38,
        y: modY - 18,
        size: 10,
        font: fontBold,
        color: textDark,
      });

      // Multi-line desc
      const words = m.desc.split('\n');
      let dy = modY - 30;
      for (const line of words) {
        page.drawText(line.slice(0, 52), {
          x: rightX + 38,
          y: dy,
          size: 7.5,
          font: fontRegular,
          color: textMuted,
        });
        dy -= 9.5;
      }

      modY -= 68;
    }

    // Bottom highlight box
    const bottomBoxY = 60;
    page.drawRectangle({
      x: 40,
      y: bottomBoxY,
      width: PAGE_WIDTH - 80,
      height: 48,
      color: roseLight,
      borderColor: roseSoft,
      borderWidth: 1,
    });
    page.drawText('EXPERIÊNCIA 100% RESPONSIVA', {
      x: 55,
      y: bottomBoxY + 30,
      size: 9.5,
      font: fontBold,
      color: roseDark,
    });
    page.drawText('Testado e aprovado em todos os modelos de iPhone e celulares Android. Carregamento instantâneo e sem travas.', {
      x: 55,
      y: bottomBoxY + 14,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
  }

  // =========================================================================
  // PAGE 3: CATÁLOGO DE SERVIÇOS & SISTEMA DE AGENDAMENTO
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawPageHeader(page, 3, 'Funcionalidades & Catálogo');

    page.drawText('Catálogo de Procedimentos Pré-Configurado', {
      x: 40,
      y: PAGE_HEIGHT - 75,
      size: 18,
      font: fontTimes,
      color: textDark,
    });
    page.drawText('Sua tabela oficial de procedimentos pronta com descrições atrativas, tempo de aplicação e valores.', {
      x: 40,
      y: PAGE_HEIGHT - 92,
      size: 10,
      font: fontRegular,
      color: textMuted,
    });

    // Services Table
    const services = [
      { name: 'Extensão de Cílios Fio a Fio Clássico', time: '1h 45min', price: 'R$ 130,00', desc: 'Efeito rímel natural, realce discreto do olhar' },
      { name: 'Volume Brasileiro (Fios em Y)', time: '2h 00min', price: 'R$ 150,00', desc: 'Preenchimento marcante, retenção prolongada e leveza' },
      { name: 'Volume Russo Sofisticado', time: '2h 30min', price: 'R$ 180,00', desc: 'Fans artesanais ultrafinos para máxima densidade' },
      { name: 'Mega Volume Glamour', time: '2h 45min', price: 'R$ 210,00', desc: 'Olhar dramático e poderoso para ocasiões especiais' },
      { name: 'Lash Lifting com Botox & Nutrição', time: '1h 15min', price: 'R$ 120,00', desc: 'Curvatura e tratamento nutritivo nos fios naturais' },
      { name: 'Spa & Design Personalizado de Sobrancelhas', time: '45min', price: 'R$ 65,00', desc: 'Mapeamento facial, higienização profunda e alinhamento' },
    ];

    let tableY = PAGE_HEIGHT - 120;

    // Table Header
    page.drawRectangle({
      x: 40,
      y: tableY - 18,
      width: PAGE_WIDTH - 80,
      height: 22,
      color: roseDark,
    });
    page.drawText('PROCEDIMENTO', { x: 50, y: tableY - 12, size: 8.5, font: fontBold, color: white });
    page.drawText('DURAÇÃO', { x: 340, y: tableY - 12, size: 8.5, font: fontBold, color: white });
    page.drawText('VALOR', { x: 440, y: tableY - 12, size: 8.5, font: fontBold, color: white });

    tableY -= 20;

    for (const s of services) {
      page.drawRectangle({
        x: 40,
        y: tableY - 34,
        width: PAGE_WIDTH - 80,
        height: 34,
        color: white,
        borderColor: cardBorder,
        borderWidth: 0.5,
      });

      page.drawText(s.name, {
        x: 50,
        y: tableY - 16,
        size: 9.5,
        font: fontBold,
        color: textDark,
      });
      page.drawText(s.desc, {
        x: 50,
        y: tableY - 28,
        size: 8,
        font: fontRegular,
        color: textMuted,
      });

      page.drawText(s.time, {
        x: 340,
        y: tableY - 20,
        size: 8.5,
        font: fontRegular,
        color: textDark,
      });

      page.drawText(s.price, {
        x: 440,
        y: tableY - 20,
        size: 10,
        font: fontBold,
        color: roseDark,
      });

      tableY -= 36;
    }

    // 2 Interactive Feature Cards
    const featBoxY = tableY - 20;
    const boxW = (PAGE_WIDTH - 95) / 2;

    // Feature Box 1: Agendamento Inteligente
    page.drawRectangle({
      x: 40,
      y: featBoxY - 170,
      width: boxW,
      height: 170,
      color: roseBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page.drawText('AGENDAMENTO EM 1 CLIQUE', {
      x: 52,
      y: featBoxY - 25,
      size: 10,
      font: fontBold,
      color: roseDark,
    });
    const agendLines = [
      '• A cliente clica em "Agendamento".',
      '• Abre a tela onde escolhe o procedimento,',
      '  a data desejada e o período (manhã/tarde).',
      '• Ao confirmar, o site abre o seu WhatsApp',
      '  já com a mensagem montada e organizada.',
      '• Sem erros, sem retrabalho e sem precisar',
      '  perguntar mil vezes o que a cliente quer.',
    ];
    let ay = featBoxY - 45;
    for (const l of agendLines) {
      page.drawText(l, { x: 52, y: ay, size: 8, font: fontRegular, color: textDark });
      ay -= 13;
    }

    // Feature Box 2: Módulo de Avaliações e Prova Social
    page.drawRectangle({
      x: 40 + boxW + 15,
      y: featBoxY - 170,
      width: boxW,
      height: 170,
      color: roseBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page.drawText('PROVA SOCIAL & DEPOIMENTOS', {
      x: 52 + boxW + 15,
      y: featBoxY - 25,
      size: 10,
      font: fontBold,
      color: roseDark,
    });
    const avalLines = [
      '• Módulo "Avalie sua experiência".',
      '• Suas clientes deixam nota (5 estrelas),',
      '  elogios e depoimentos sobre seu trabalho.',
      '• Depoimentos geram confiança imediata',
      '  para novas clientes que estão em dúvida.',
      '• Fortalece sua reputação em Cílios',
      '  e atrai alunas para seus cursos.',
    ];
    let vy = featBoxY - 45;
    for (const l of avalLines) {
      page.drawText(l, { x: 52 + boxW + 15, y: vy, size: 8, font: fontRegular, color: textDark });
      vy -= 13;
    }

    // Floating Button indicator
    const floatY = 60;
    page.drawRectangle({
      x: 40,
      y: floatY,
      width: PAGE_WIDTH - 80,
      height: 44,
      color: roseLight,
      borderColor: roseSoft,
      borderWidth: 1,
    });
    page.drawText('BOTÃO FLUTUANTE DE WHATSAPP ATIVO 24 HORAS', {
      x: 55,
      y: floatY + 26,
      size: 9.5,
      font: fontBold,
      color: roseDark,
    });
    page.drawText('Um botão fixo e discreto acompanha a rolagem da cliente, permitindo contato rápido em qualquer momento.', {
      x: 55,
      y: floatY + 12,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
  }

  // =========================================================================
  // PAGE 4: BENEFÍCIOS COMERCIAIS & PROPOSTA DE VALOR
  // =========================================================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawPageHeader(page, 4, 'Benefícios & Retorno');

    page.drawText('Por que este Biosite é o Melhor Investimento?', {
      x: 40,
      y: PAGE_HEIGHT - 75,
      size: 18,
      font: fontTimes,
      color: textDark,
    });
    page.drawText('Entenda como a sua nova presença digital se paga rapidamente com mais agendamentos e alunas.', {
      x: 40,
      y: PAGE_HEIGHT - 92,
      size: 10,
      font: fontRegular,
      color: textMuted,
    });

    const pillars = [
      {
        title: '1. Percepção de Valor e Autoridade de Luxo',
        desc: 'Profissionais que usam linktrees genéricos transmitem amadorismo. Seu biosite exclusivo passa a imagem de clínica e estúdio de alto padrão, permitindo cobrar valores justos e aumentar seu ticket médio.',
      },
      {
        title: '2. Conversão de Visitantes em Agendamentos',
        desc: 'Quantas pessoas visitam seu Instagram e vão embora sem mandar mensagem? Com o biosite, o caminho para agendar é claro, fácil e sedutor. Cada elemento foi pensado para levar ao seu WhatsApp.',
      },
      {
        title: '3. Valorização dos Seus Cursos de Cílios',
        desc: 'O botão de destaque para o Curso Lash posiciona você como educadora e mentora reconhecida, abrindo uma nova fonte de renda altamente lucrativa com turmas e atendimentos VIP.',
      },
      {
        title: '4. Economia de Tempo e Atendimento Ágil',
        desc: 'As dúvidas sobre procedimentos, valores e cuidados são esclarecidas no próprio site. Quando a cliente entra em contato, ela já sabe o que deseja e está pronta para pagar.',
      },
    ];

    let pilY = PAGE_HEIGHT - 125;
    for (const p of pillars) {
      page.drawRectangle({
        x: 40,
        y: pilY - 48,
        width: PAGE_WIDTH - 80,
        height: 58,
        color: white,
        borderColor: cardBorder,
        borderWidth: 1,
      });

      page.drawCircle({
        x: 58,
        y: pilY - 14,
        size: 5,
        color: roseSoft,
      });

      page.drawText(p.title, {
        x: 72,
        y: pilY - 18,
        size: 11,
        font: fontBold,
        color: roseDark,
      });

      page.drawText(p.desc.slice(0, 110), {
        x: 72,
        y: pilY - 32,
        size: 8.5,
        font: fontRegular,
        color: textDark,
      });
      if (p.desc.length > 110) {
        page.drawText(p.desc.slice(110), {
          x: 72,
          y: pilY - 43,
          size: 8.5,
          font: fontRegular,
          color: textDark,
        });
      }

      pilY -= 68;
    }

    // Call to Action / Pitch Box
    const ctaY = pilY - 15;
    page.drawRectangle({
      x: 40,
      y: ctaY - 170,
      width: PAGE_WIDTH - 80,
      height: 170,
      color: roseBg,
      borderColor: roseSoft,
      borderWidth: 1.5,
    });

    page.drawText('SEU SITE JÁ ESTÁ PRONTO & NO AR!', {
      x: 60,
      y: ctaY - 30,
      size: 13,
      font: fontBold,
      color: roseDark,
    });

    const ctaLines = [
      'Este projeto já foi 100% desenvolvido, diagramado e otimizado com suas fotos reais,',
      'sua identidade visual e seu catálogo completo de procedimentos.',
      '',
      'Para ativar no seu perfil do Instagram e começar a receber agendamentos hoje mesmo,',
      'basta confirmar o pacote de implantação.',
    ];
    let cy = ctaY - 50;
    for (const cl of ctaLines) {
      page.drawText(cl, { x: 60, y: cy, size: 9, font: fontRegular, color: textDark });
      cy -= 14;
    }

    // Contact line
    page.drawRectangle({
      x: 60,
      y: ctaY - 150,
      width: PAGE_WIDTH - 120,
      height: 30,
      color: roseDark,
    });
    page.drawText('CLIQUE OU RESPONDA PARA ATIVAR O SEU BIOSITE', {
      x: 130,
      y: ctaY - 138,
      size: 10,
      font: fontBold,
      color: white,
    });

    // Signature stamp
    page.drawText('Geovana Maestri · Beleza, Confiança & Presença', {
      x: 40,
      y: 65,
      size: 9,
      font: fontTimesItalic,
      color: roseDark,
    });
    page.drawText('Documento gerado para fins de apresentação de proposta técnica e visual.', {
      x: 40,
      y: 52,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/Apresentacao_Biosite_Geovana_Maestri.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF successfully generated at:', outputPath, 'Size:', pdfBytes.length, 'bytes');
}

generatePitchPdf().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
