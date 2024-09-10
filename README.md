# AI Anime Art Generator

Welcome to the codebase of the wonderful tool AI Anime Arg Generator!

AI Anime Art Generator is an AI-driven cutting-edge tool for anime arts creation. Perfect for beginners to easily create stunning anime art without any prior experience.

website: [https://aianimeartgenerator.com](https://aianimeartgenerator.com)

![AI Anime Art Generator](https://i.imgur.com/nwXhYnQ.png)

## Use Cases

### Character Design for Anime

Create detailed and unique character designs for your anime series or manga. Customize every aspect to fit your story's needs and bring your characters to life with vibrant colors and dynamic expressions.

### Custom Avatars for Social Media

Generate personalized avatars for your social media profiles. Stand out with unique, AI-created anime artwork that reflects your personality and style.

### Art Inspiration and Exploration

Use the AI Anime Art Generator to explore new artistic styles and ideas. Experiment with different designs and color schemes to find inspiration for your next big project.

## Tech Stack

AI Anime Art Generator is built on the following stack:

- Next.js – Frontend/Backend
- TailwindCSS – Styles
- Google Analytics
- Vercel - Hosting
- Replicate - Image Generation
- CloudFlare R2 - Image Storage
- Clerk - User Login

## Deployment

Clone the codebase to your local machine.

```bash
git clone https://github.com/enterwiz/ai-anime-art-generator.git
cd ai-anime-art-generator
```

Initialize your local postgres database or use remote Supabase database.

```bash
export DATABASE_URL=your_local_postgres_connstr
npx prisma migrate dev
```

Copy the .env.example file to .env.local, fill in the environment variables.

Then you can run the project locally:

```bash
npm run dev
```

Open your local website: http://localhost:3000.

## Acknowledgements

This project heavily references another project [Landing page boilerplate](https://landingpage.weijunext.com/), and we are very grateful for their support.

prompt:
好，我们现在开始做一些东西，我需要做的是一个生成Character headcanon的网站，用户可以输入自己想生成的Character的名字（或者从我提供的名字中选一个），然后根据一些选项生成headcanon，请发挥你的创造性和对Character headcanon的理解，充分制造些选项来吸引用户，你可以尽可能的搜索相关网站的信息来设计！ @Web 
AI提议的设计：
明白了,我会根据您的要求设计一个生成Character headcanon的网站。以下是我的一些想法和建议:
1. 角色选择:
提供一个输入框让用户输入自定义角色名
同时提供一个预设角色列表供选择,可以包括流行作品中的角色
Headcanon类型选择:
性格特征
背景故事
关系网络
兴趣爱好
秘密/隐藏面
日常生活习惯
未来发展
生成选项:
生成数量(1-5条)
风格(正经/搞笑/黑暗等)
长度(简短/中等/详细)
额外功能:
保存/分享生成的headcanon
评分系统
用户提交自己的headcanon
界面设计:
简洁直观的界面
可视化的角色形象(如果是预设角色)
动态生成效果
示例问题(参考perchance.org的Character Headcanon Generator):
这个角色最喜欢的食物是什么?
他们有什么特殊的技能或天赋?
他们童年时期最美好的回忆是什么?
他们最害怕什么?
他们有什么不为人知的爱好?
这个设计结合了用户自定义和预设选项,同时提供了多样化的headcanon生成选项。我们可以进一步细化每个部分,增加更多有趣和吸引人的元素。您对这个初步设计有什么想法或建议吗?

prompt:
Character Headcanon粉丝的角度来讲，还有什么可以添加的，或者引人入胜的玩法 @Web 
claude提议的设计：
从粉丝的角度来看，Character Headcanon还有很多有趣和引人入胜的玩法可以添加:
主题挑战：可以设置每周或每月的主题，比如"童年回忆"、"秘密爱好"等，让粉丝围绕特定主题创作headcanon。
交叉创作：鼓励粉丝将不同作品的角色进行crossover，创造有趣的互动场景。
AU设定：探索角色在不同平行宇宙或设定中的可能性，比如现代AU、魔法AU等。
问答游戏：参考这个Tumblr帖子中的30个问题，让用户随机选择问题和角色进行回答。
视觉化创作：鼓励粉丝将headcanon通过插画、漫画或短视频的形式呈现出来。
角色互换：想象如果两个角色互换身份会发生什么。
成长轨迹：创作角色在不同年龄段的headcanon，展现其成长过程。
节日特辑：围绕各种节日创作特别的headcanon。
"如果..."系列：探讨"如果某个关键事件没有发生"会导致怎样的不同结果。
互动故事：让多个用户接力创作，共同构建一个完整的headcanon故事。
这些玩法可以增加互动性，激发创意，让Character Headcanon Generator更加有趣和吸引人。
gpt4o提议的设计：
从粉丝的角度来看，Character Headcanon还有很多有趣和引人入胜的玩法可以添加：
1. 主题挑战：可以设置每周或每月的主题，比如"童年回忆"、"秘密爱好"等，让粉丝围绕特定主题创作headcanon。这种方式可以激发创意，并让社区成员有共同的讨论话题。
2. 交叉创作：鼓励粉丝将不同作品的角色进行crossover，创造有趣的互动场景。例如，将《哈利·波特》中的角色与《星球大战》中的角色结合，看看会发生什么有趣的故事。
3. AU设定：探索角色在不同平行宇宙或设定中的可能性，比如现代AU、魔法AU等。这种方式可以让粉丝们重新想象他们喜欢的角色在不同环境中的表现。
4. 问答游戏：参考这个Tumblr[https://www.tumblr.com/nothingbutprompts/181992396249/headcanon-prompts]帖子中的30个问题，让用户随机选择问题和角色进行回答。例如，“他们最喜欢的食物是什么？”、“他们有什么特殊的技能或天赋？”等。
5. 视觉化创作：鼓励粉丝将headcanon通过插画、漫画或短视频的形式呈现出来。这不仅增加了创作的多样性，还能吸引更多喜欢视觉艺术的粉丝参与。
6. 角色互换：想象如果两个角色互换身份会发生什么。例如，如果《哈利·波特》中的哈利和赫敏互换身份，他们的故事会如何发展？
7. 成长轨迹：创作角色在不同年龄段的headcanon，展现其成长过程。这可以帮助粉丝更深入地了解角色的背景和发展。
节日特辑：围绕各种节日创作特别的headcanon。例如，角色们如何庆祝圣诞节、万圣节等。
"如果..."系列：探讨"如果某个关键事件没有发生"会导致怎样的不同结果。例如，如果《哈利·波特》中的哈利没有成为救世主，他的生活会怎样？
10. 互动故事：让多个用户接力创作，共同构建一个完整的headcanon故事。这种方式可以增加社区的互动性，并激发更多的创意。
这些玩法可以增加互动性，激发创意，让Character Headcanon Generator更加有趣和吸引人。如果你有更多的想法或需要进一步的帮助，请告诉我！

[ ] 组织prompt，使之更完善（根据不同语言的切换等）
[ ] 可以选不同风格的“创作家”，对应不同能力的大模型（主要是贵的和便宜的区别），消耗不同点数
[ ] 点数消耗现在写死在app/api/generateText/route.ts里 const creditsNeed = 10; 要考虑扩展