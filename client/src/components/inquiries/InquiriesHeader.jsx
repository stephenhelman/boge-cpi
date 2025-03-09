const InquiriesHeader = () => {
  const renderedHeader = (
    <tr>
      <td className="accountsHeader">Company</td>
      <td className="accountsHeader">Inquiry Type</td>
      <td className="accountsHeader">Date Inquired</td>
      <td className="accountsHeader">Removal Date</td>
      <td className="accountsHeader">Days Active</td>
    </tr>
  );

  return <thead>{renderedHeader}</thead>;
};

export default InquiriesHeader;
