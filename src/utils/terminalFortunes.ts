
export interface Fortune {
  text: string;
  category: 'developer' | 'finance' | 'adult' | 'general' | 'hr';
}

export const fortunes: Fortune[] = [
  // Developer fortunes
  {
    category: 'developer',
    text: "Semicolons save lives. Not using them is like driving without a seatbelt."
  },
  {
    category: 'developer',
    text: "The code you're about to write will be read more times than it's executed."
  },
  {
    category: 'developer',
    text: "Always code as if the person who will maintain your code is a violent psychopath who knows where you live."
  },
  {
    category: 'developer',
    text: "Your pull request will be approved... after 17 review comments and a complete rewrite."
  },
  {
    category: 'developer',
    text: "There are 10 types of people in this world: those who understand binary and those who don't."
  },
  {
    category: 'developer',
    text: "The probability of a bug existing in your code is directly proportional to how embarrassing it would be if found."
  },
  {
    category: 'developer',
    text: "No one understands your code better than you did when you wrote it, and you don't understand it at all now."
  },
  {
    category: 'developer',
    text: "The 'master' branch is now called 'main'... but your bugs still identify as features."
  },
  {
    category: 'developer',
    text: "It's not a bug, it's an undocumented feature."
  },
  {
    category: 'developer',
    text: "If debugging is the process of removing bugs, then programming must be the process of putting them in."
  },
  {
    category: 'developer',
    text: "A good programmer is someone who always looks both ways before crossing a one-way street."
  },
  {
    category: 'developer',
    text: "Refactoring: The process of taking something that works and turning it into something that doesn't work... but looks nicer."
  },
  {
    category: 'developer',
    text: "The best code is no code at all."
  },
  {
    category: 'developer',
    text: "Don't comment bad code—rewrite it."
  },
  {
    category: 'developer',
    text: "Software and cathedrals are much the same—first we build them, then we pray."
  },
  {
    category: 'developer',
    text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight."
  },
  {
    category: 'developer',
    text: "Your .gitignore file has more todo comments than your actual codebase."
  },
  {
    category: 'developer',
    text: "Inheritance is when you get fired but your kids still have to maintain your code."
  },
  {
    category: 'developer',
    text: "JavaScript: The only language that people try to use without learning it first."
  },
  {
    category: 'developer',
    text: "QA Engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. Orders a sfdeljknesv."
  },
  {
    category: 'developer',
    text: "CSS: Because apparently 'just move that div a little to the left' wasn't in the job description."
  },
  {
    category: 'developer',
    text: "The two hardest problems in computer science: cache invalidation, naming things, and off-by-one errors."
  },
  {
    category: 'developer',
    text: "Did you hear about the programming language that didn't have bugs? Neither did I."
  },
  {
    category: 'developer',
    text: "If a programmer gets stuck in the shower, they'll wash their hair, rinse, and repeat."
  },
  {
    category: 'developer',
    text: "My code doesn't work. I have no idea why. My code works. I have no idea why."
  },
  {
    category: 'developer',
    text: "Being a good programmer is 3% talent, 97% not being distracted by the internet."
  },
  {
    category: 'developer',
    text: "When I wrote this code, only God and I understood what it did. Now, only God knows."
  },
  {
    category: 'developer',
    text: "Remember that there is no code faster than no code."
  },
  {
    category: 'developer',
    text: "Documentation is like sex: when it's good, it's very good; when it's bad, it's better than nothing."
  },
  {
    category: 'developer',
    text: "My code works perfectly on every computer except the ones I don't own."
  },
  
  // Finance fortunes
  {
    category: 'finance',
    text: "We need to monetize this synergy to optimize our KPIs and circle back on our growth hacking strategies."
  },
  {
    category: 'finance',
    text: "Let's leverage our core competencies to deliver a value-added proposition to our stakeholders."
  },
  {
    category: 'finance',
    text: "The ROI on this paradigm shift will be a game-changer for our strategic vision."
  },
  {
    category: 'finance',
    text: "Our disruptive innovation will create a blue ocean strategy with uncontested market space."
  },
  {
    category: 'finance',
    text: "We're pivoting to a lean startup methodology to iterate on our minimum viable product."
  },
  {
    category: 'finance',
    text: "Let's take this offline and deep dive into the analytics to find actionable insights."
  },
  {
    category: 'finance',
    text: "We need to be agile and pivot our business model to align with market demands."
  },
  {
    category: 'finance',
    text: "The bottom line is that we need to think outside the box and push the envelope."
  },
  {
    category: 'finance',
    text: "I'll circle back with you after I touch base with the team to get more bandwidth on this project."
  },
  {
    category: 'finance',
    text: "We need to drill down into the data to ensure we're moving the needle on our KPIs."
  },
  {
    category: 'finance',
    text: "Let's table this discussion and reconvene when we have more clarity on the deliverables."
  },
  {
    category: 'finance',
    text: "We need to right-size our workforce to optimize operational efficiency."
  },
  {
    category: 'finance',
    text: "Let's sunset this legacy product and focus on our core business objectives."
  },
  {
    category: 'finance',
    text: "We need to streamline our processes to achieve economies of scale."
  },
  {
    category: 'finance',
    text: "The market correction has created an opportunity for strategic acquisitions."
  },
  {
    category: 'finance',
    text: "Our value proposition needs to be aligned with customer pain points."
  },
  {
    category: 'finance',
    text: "We're experiencing significant tailwinds in this sector, which will drive revenue growth."
  },
  {
    category: 'finance',
    text: "Let's double-click on this issue to understand the root cause analysis."
  },
  {
    category: 'finance',
    text: "We need to future-proof our business model against disruptive technologies."
  },
  {
    category: 'finance',
    text: "The bulls are running, but the bears are lurking. Diversify or die."
  },
  {
    category: 'finance',
    text: "Your quarterly earnings call is just a LARP session for adults with spreadsheets."
  },
  {
    category: 'finance',
    text: "Have you tried turning your failing business off and on again? It works for tech support."
  },
  {
    category: 'finance',
    text: "When the CEO says 'tighten our belts,' they mean your belt, not the executive bonus structure."
  },
  {
    category: 'finance',
    text: "Due diligence is like foreplay - skipping it might feel expedient but usually ends in regret."
  },
  {
    category: 'finance',
    text: "Bitcoin investments are like relationships - timing the market is less important than time in the market."
  },

  // Adult humor fortunes
  {
    category: 'adult',
    text: "I told my wife she was drawing her eyebrows too high. She looked surprised."
  },
  {
    category: 'adult',
    text: "I'm on a whiskey diet. I've lost three days already."
  },
  {
    category: 'adult',
    text: "I don't trust stairs. They're always up to something."
  },
  {
    category: 'adult',
    text: "My wife said I should do lunges to stay in shape. That would be a big step forward."
  },
  {
    category: 'adult',
    text: "Why don't scientists trust atoms? Because they make up everything."
  },
  {
    category: 'adult',
    text: "I told my wife she was bad at doing the laundry. She put me in the dryer for an hour."
  },
  {
    category: 'adult',
    text: "Marriage is like a deck of cards. In the beginning, all you need is two hearts and a diamond. By the end, you wish you had a club and a spade."
  },
  {
    category: 'adult',
    text: "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline? Attire."
  },
  {
    category: 'adult',
    text: "I told my doctor that I broke my arm in two places. He told me to stop going to those places."
  },
  {
    category: 'adult',
    text: "Two fish are in a tank. One says to the other, 'Do you know how to drive this thing?'"
  },
  {
    category: 'adult',
    text: "Why did the scarecrow win an award? Because he was outstanding in his field."
  },
  {
    category: 'adult',
    text: "My boss told me to have a good day, so I went home."
  },
  {
    category: 'adult',
    text: "Never trust an atom. They make up everything."
  },
  {
    category: 'adult',
    text: "I couldn't figure out why the ball kept getting larger. Then it hit me."
  },
  {
    category: 'adult',
    text: "I don't trust people who do acupuncture. They're back stabbers."
  },
  {
    category: 'adult',
    text: "Why did the coffee file a police report? It got mugged."
  },
  {
    category: 'adult',
    text: "Why did the hipster burn his tongue? He drank his coffee before it was cool."
  },
  {
    category: 'adult',
    text: "I used to be a baker, but I couldn't make enough dough."
  },
  {
    category: 'adult',
    text: "I'm reading a book on anti-gravity. It's impossible to put down."
  },
  {
    category: 'adult',
    text: "The early bird gets the worm, but the second mouse gets the cheese."
  },
  {
    category: 'adult',
    text: "I was going to tell a time-traveling joke, but you didn't like it."
  },
  {
    category: 'adult',
    text: "I asked the gym instructor if he could teach me to do the splits. He replied, 'How flexible are you?' I said, 'I can't make Tuesdays.'"
  },
  {
    category: 'adult',
    text: "My wife told me to stop impersonating a flamingo. I had to put my foot down."
  },
  {
    category: 'adult',
    text: "If at first you don't succeed, skydiving is probably not for you."
  },
  {
    category: 'adult',
    text: "I wasn't originally going to get a brain transplant, but then I changed my mind."
  },
  
  // HR fortunes
  {
    category: 'hr',
    text: "Your resume has been received. We'll get back to you when hell freezes over."
  },
  {
    category: 'hr',
    text: "The beatings will continue until employee satisfaction improves."
  },
  {
    category: 'hr',
    text: "We're not saying you're replaceable, but we have three backup candidates for your position."
  },
  {
    category: 'hr',
    text: "HR stands for 'Hardly Relevant' in most corporate decisions."
  },
  {
    category: 'hr',
    text: "Your request for a raise is being processed at the same speed as continental drift."
  },
  {
    category: 'hr',
    text: "We value work-life balance. That's why we give you a full 8 hours to work and a full 8 hours to sleep."
  },
  {
    category: 'hr',
    text: "Casual Friday has been cancelled due to multiple interpretations of the word 'casual'."
  },
  {
    category: 'hr',
    text: "Your performance review is scheduled for right after this round of layoffs."
  },
  {
    category: 'hr',
    text: "We're more of a family than a company, which explains the dysfunction and unpaid overtime."
  },
  {
    category: 'hr',
    text: "The only thing more painful than our hiring process is our health insurance plan."
  },
  {
    category: 'hr',
    text: "Your application was rejected because you failed to read our minds during the interview."
  },
  {
    category: 'hr',
    text: "Remember, there are no stupid questions, just stupid people who ask questions."
  },
  {
    category: 'hr',
    text: "We're focused on diversity: we're looking for diverse ways to make you work more for less pay."
  },
  {
    category: 'hr',
    text: "Our wellness program consists of providing enough stress to build immunity to more stress."
  },
  {
    category: 'hr',
    text: "We'd like to discuss your future with the company, since it won't include a pension."
  },
  {
    category: 'hr',
    text: "Your request for additional resources has been denied due to our 'do more with less' initiative."
  },
  {
    category: 'hr',
    text: "The good news is we're giving you more responsibility. The bad news is we're not giving you more money."
  },
  {
    category: 'hr',
    text: "Our open-door policy means you're welcome to complain, and we're welcome to ignore it."
  },
  {
    category: 'hr',
    text: "We're not monitoring your computer activity, but we know you're reading this instead of working."
  },
  {
    category: 'hr',
    text: "Your retirement plan is to hope the company stays in business long enough for you to build a 401k."
  },
  
  // General fortunes
  {
    category: 'general',
    text: "A journey of a thousand miles begins with a single step."
  },
  {
    category: 'general',
    text: "Fortune favors the bold."
  },
  {
    category: 'general',
    text: "You will find a hidden opportunity in an unexpected place."
  },
  {
    category: 'general',
    text: "Your creativity will lead you to success."
  },
  {
    category: 'general',
    text: "Good things come to those who wait... but better things come to those who work for it."
  },
  {
    category: 'general',
    text: "The greatest risk is not taking one."
  },
  {
    category: 'general',
    text: "Your hard work will pay off in unexpected ways."
  },
  {
    category: 'general',
    text: "A smile is your passport into the hearts of others."
  },
  {
    category: 'general',
    text: "Your talents will be recognized and rewarded."
  },
  {
    category: 'general',
    text: "The best way to predict your future is to create it."
  },
  {
    category: 'general',
    text: "Your success will astonish everyone."
  },
  {
    category: 'general',
    text: "You will soon embark on a significant journey."
  },
  {
    category: 'general',
    text: "Embrace the glorious mess that you are."
  },
  {
    category: 'general',
    text: "The universe is aligning to fulfill your deepest desires."
  },
  {
    category: 'general',
    text: "A lifetime of happiness awaits you."
  },
  {
    category: 'general',
    text: "Your path may be difficult, but will be rewarding."
  },
  {
    category: 'general',
    text: "An unexpected friendship will prove most valuable."
  },
  {
    category: 'general',
    text: "Keep your face to the sunshine and you cannot see shadows."
  },
  {
    category: 'general',
    text: "Your life will be happy and peaceful."
  },
  {
    category: 'general',
    text: "The greatest adventure is what lies ahead."
  },
];

export const getFortuneByCategory = (category?: string): Fortune => {
  let filteredFortunes: Fortune[] = fortunes;
  
  if (category && ['developer', 'finance', 'adult', 'general', 'hr'].includes(category.toLowerCase())) {
    filteredFortunes = fortunes.filter(
      fortune => fortune.category === category.toLowerCase()
    );
  }
  
  // Fallback to all fortunes if filtered list is empty
  if (filteredFortunes.length === 0) {
    filteredFortunes = fortunes;
  }
  
  return filteredFortunes[Math.floor(Math.random() * filteredFortunes.length)];
};

export const getFortuneSelectionPrompt = (): string => {
  return `
Choose a fortune category:
1. Developer
2. Finance
3. HR
4. Adult
5. General
6. Random

Enter the number or name of your desired category:
  `;
};
