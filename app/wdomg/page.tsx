import BudgetCards from '@/app/wdomg/components/budget-data';
import { getDatabaseClient } from '@/lib/utils/server';

interface Content {
  title: string;
  intro_text: string;
  action_text: string;
  action_button_text: string;
}

// This is an example app, used in lessons to show how to start from
// just a technical requirements document and start to build out the app
// step by step. The related technical requirements document is:
// https://docs.google.com/document/d/1zslmkOvvI1-NsxEvADV9f5s_ue97AZ4gMeMuYOpY7Ns/edit#heading=h.92o75fokmwgw
export default async function WDOMG() {

  const databaseClient = getDatabaseClient();
  const { data } = await databaseClient.from('wdomg_page').select(`title, intro_text, action_text, action_button_text`).limit(1).single();
  if (!data) {
    return <div>Content not found</div>
  }
  const content: Content = data;

  return (
    <>

      <div id="navbar">
        <div className="container">
          Header
        </div>
      </div>

      <div id="main">
        <div className="container">
          <h1>{content.title}</h1>
          <div className="content">
            <p>{content.intro_text}</p>
          </div>
        </div>

        <div className="container">
          <BudgetCards />
        </div>

        <div className="container">
          <div className="action-boxes">
            <div className="align-center">
              {content.action_text}
            </div>
            <div className="align-center flex-end">
              <a href="https://next.obudget.org" target="_blank" className="button margin-reset">{content.action_button_text}</a>
            </div>
          </div>

        </div>
      </div>

      <div id="footer">
        <div className="container">
          Footer
        </div>
      </div>
    </>
  )
}