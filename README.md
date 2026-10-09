# Marcos Eduardo — Engenheiro Civil

Site institucional estático, sem dependências de build. A página pode ser publicada diretamente no GitHub Pages, Vercel ou qualquer serviço que sirva arquivos estáticos.

## Estrutura

```text
.
├── index.html
├── assets/
│   ├── frame_final_hero_texto_superior_1920x1080.png
│   └── hero_blueprint_texto_superior_1920x1080.mp4
└── README.md
```

## Desenvolvimento local

Abra `index.html` no navegador ou sirva a pasta com qualquer servidor estático. A segunda opção é recomendada para validar o vídeo e os caminhos dos assets:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Publicação

- **GitHub Pages:** publique a branch principal usando a raiz do repositório como pasta de origem.
- **Vercel:** importe o repositório e use as configurações padrão; não é necessário comando de build.

O vídeo e o frame estão em `assets/` e já são referenciados por caminhos relativos, então o projeto não depende dos assets temporários do Figma.
