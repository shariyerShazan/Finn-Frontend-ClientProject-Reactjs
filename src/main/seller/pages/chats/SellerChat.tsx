import React from 'react'
import SearchChatSection from './_components/SearchChatSection';
import Chats from './_components/Chats';

const SellerChat = () => {
    const [activePartnerId, setActivePartnerId] = React.useState(1);
    const partners = [
      {
        id: 1,
        name: "Kathryn Murphy",
        time: "03:48 am",
        message: "Is it available?",
        role: "Seller",
      },
      {
        id: 2,
        name: "Bailey Drake",
        time: "02:10 pm",
        message: "I can offer $300",
        role: "Buyer",
      },
    ];
    const activePartner = partners.find((p) => p.id === activePartnerId);

  return (
    <div className='p-4'>
      <div className="flex h-[80vh] mx-auto border rounded-2xl overflow-hidden shadow-xl bg-white m-4">
        <SearchChatSection
          partners={partners}
          activeId={activePartnerId}
          onSelect={setActivePartnerId}
        />
        <Chats activePartner={activePartner} />
      </div>
    </div>
  );
}

export default SellerChat
