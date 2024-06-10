'use client';
import { useEffect, useState } from 'react';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import styles bundle
import 'swiper/css/bundle';

const dataQuery = encodeURIComponent("select code, parent, func_cls_title_1, func_cls_title_2, year, net_allocated from raw_budget where code like '%C%' and length(code)=4 and year = 2024");
const dataApiBase = 'https://next.obudget.org/api/query';
const dataApiEndpoint = `${dataApiBase}?query=${dataQuery}`;

interface RawBudgetDataRow {
  code: string;
  parent: string;
  func_cls_title_1: string[];
  func_cls_title_2: string[];
  year: number;
  net_allocated: number;
}

interface RawBudgetData {
  rows: RawBudgetDataRow[];
}

interface BudgetItem {
  code: string;
  title: string;
  rawAmount: number;
  amount: string
  portion: string;
}

interface BudgetGroup {
  title: string;
  rawAmount: number;
  amount: string;
  portion: string;
  items: BudgetItem[];
}

interface BudgetGroups {
  [key: string]: BudgetGroup;
}

interface BudgetRevenueData {
  rawAmount: number;
  amount: string;
  groups: BudgetGroups;
}

interface BudgetExpenditureData {
  rawAmount: number;
  amount: string;
  groups: BudgetGroups;
}

interface BudgetData {
  year: number;
  revenue: BudgetRevenueData;
  expenditure: BudgetExpenditureData;
}

interface BudgetCardsProps {
  group: BudgetGroup;
}

async function getRawBudgetData(): Promise<RawBudgetData> {
    const response = await fetch(dataApiEndpoint);
    const data = await response.json();
    return data;
}

export async function getBudgetData(): Promise<BudgetData> {
  const rawBudgetData = await getRawBudgetData();
  const year = rawBudgetData.rows[0].year;
  const revenue = {rawAmount: 0, amount: '', groups: {}} as BudgetRevenueData;
  const expenditure = {rawAmount: 0, amount: '', groups: {}} as BudgetExpenditureData;
  // loop over the raw data and build out the data structure for our app
  for (const row of rawBudgetData.rows) {
    const rawAmount = row.net_allocated as number;
    const amount = ''; // is set later
    const code = row.code;
    const group = translate(row.func_cls_title_1[0]);
    const title = translate(row.func_cls_title_2[0]);
    const budgetItem = { code, title, rawAmount, amount } as BudgetItem;

    // if group === הכנסות then type = revenue else type = expenditure
    let targetDataType = expenditure;
    if (group === 'Revenue') {
      targetDataType = revenue;
    }

    targetDataType.rawAmount += budgetItem.rawAmount;
    // if the group already exists, modify it, else, create it
    const budgetGroup = targetDataType.groups[group] || {title: group, rawAmount: 0, amount: '', portion: '', items: []} as BudgetGroup;
    budgetGroup.rawAmount += budgetItem.rawAmount;
    budgetGroup.items.push(budgetItem);
    targetDataType.groups[group] = budgetGroup;
  }

  // iterating over the new data structures to
  // - calculate the portions
  // - format all numbers for display
  for (const group of Object.values(revenue.groups)) {
    group.portion = formatAsPercentage(group.rawAmount / revenue.rawAmount);
    group.amount = formatAsMoney(group.rawAmount);
    for (const item of group.items) {
      item.portion = formatAsPercentage(item.rawAmount / group.rawAmount);
      item.amount = formatAsMoney(item.rawAmount);
    }
  }
  for (const group of Object.values(expenditure.groups)) {
    group.portion = formatAsPercentage(group.rawAmount / expenditure.rawAmount);
    group.amount = formatAsMoney(group.rawAmount);
    for (const item of group.items) {
      item.portion = formatAsPercentage(item.rawAmount / group.rawAmount);
      item.amount = formatAsMoney(item.rawAmount);
    }
  }

  return { year, revenue, expenditure } as BudgetData;
}

function formatAsMoney(amount: number): string {
  return amount.toLocaleString('he-IL', {style: 'currency', currency: 'ILS', minimumFractionDigits: 0});
}

function formatAsPercentage(portion: number): string {
  return portion.toLocaleString('he-IL', {style: 'percent', minimumFractionDigits: 0});
}

function translate(hebrewString: string): string {
  const lookup = {
    "בטחון וסדר ציבורי": "Security",
    "הכנסות": "Revenue",
    "תשתיות": "Infrastructure",
    "שירותים חברתיים": "Social Services",
    "משרדי מטה": "Ministries",
    "ענפי משק": "Economic Affairs",
    "החזרי חוב": "Debt Repayment",
    "הוצאות אחרות": "Other Expenditure",
    "אגרות": "Transfers",
    "בטחון": "Security",
    "בטחון פנים": "Internal Security",
    "בטחון-אחר": "Other Security",
    "בריאות": "Health",
    "חינוך": "Education",
    "השכלה גבוהה": "Higher Education",
    "רווחה": "Welfare",
    "העברות לביטוח הלאומי": "Transfers to National Insurance",
    "מדע, תרבות וספורט": "Science, Culture and Sport",
    "קליטת עליה": "Absorption",
    "תעסוקה": "Employment",
    "תחבורה": "Transportation",
    "משק המים": "Water",
    "אנרגיה": "Energy",
    "בינוי ושיכון": "Construction and Housing",
    "ראש הממשלה": "Prime Minister's Office",
    "אוצר": "Treasury",
    "משפטים": "Justice",
    "חוץ": "Foreign Affairs",
    "פנים ושלטון מקומי": "Interior and Local Government",
    "משרדים נוספים": "Other Ministries",
    "שירותי דת": "Religious Services",
    "תיירות": "Tourism",
    "חקלאות": "Agriculture",
    "כלכלה ותעשיה": "Economy and Industry",
    "הגנת הסביבה": "Environmental Protection",
    "תקשורת": "Communications",
    "ריבית": "Interest",
    "קרן": "Fund",
    "קרן - ביטוח לאומי": "Fund - National Insurance",
    "גמלאות": "Pensions",
    "הוצאות שונות": "Other Expenditure",
    "רזרבה": "Reserve",
    "מסים ישירים": "Direct Taxes",
    "מסים עקיפים": "Indirect Taxes",
    "הכנסות אחרות": "Other Revenue",
    "הכנסות למימון גירעון": "Revenue for Deficit Financing",
  }
  // @ts-ignore
  return lookup[hebrewString] || hebrewString;
}

function BudgetCard(props: BudgetCardsProps) {
  const { group } = props;
  return (
    <div className="budget-card">
      <div className="budget-card-title">{group.title}</div>
      <div className="budget-card-amount">{group.amount}</div>
      <div className="budget-card-bottom">
        <div className="budget-card-breakdown">
          {group.items.map(item => (
            <span key={item.code} className="budget-card-breakdown-item">
              {item.title} {item.portion}
            </span>
          ))}
        </div>
        <div className="budget-card-portion">{group.portion}</div>
      </div>
    </div>
  )
}

export default function BudgetCards() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  useEffect(() => {
    getBudgetData().then(data => {
      setBudgetData(data);
    });
  }, []);

  if (!budgetData) {
    return <div>loading...</div>
  }

  const {revenue, expenditure} = budgetData;
  const expenditureGroups = Object.values(expenditure.groups);

  return (
    <div>
      <h2>High-level budget distribution</h2>
      <p>In {budgetData.year}, total expenditure is {formatAsMoney(expenditure.rawAmount)}, against a total revenue of {formatAsMoney(revenue.rawAmount)}. Here&apos;s how expenditure breaks down.</p>
      <div className="container">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          scrollbar={{ enabled: false }}
          pagination
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {expenditureGroups.map(group => <SwiperSlide key={group.title}><BudgetCard group={group} /></SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  )
}