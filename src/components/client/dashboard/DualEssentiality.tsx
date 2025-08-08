// "use client";

// // import Stepper from "@/components/stepper/stepper";
// import Stepper from "@/components/client/dashboard/utils/stepper/stepper"

// // import IROAssessment from "./iro-assessment";
// import IROAssessment from "@/components/client/dashboard/utils/iro/iro-assessment"
// // import IroAssessmentSelection from "./iro-assessment-selection";
// import IroAssessmentSelection from "@/components/client/dashboard/utils/iro/iro-assessment-selection"
// // import Reporting from "./reporting";
// import Reporting from "@/components/client/dashboard/utils/iro/reporting"
// // import StakeholderSelection from "./stakeholder-selection";
// import StakeholderSelection from "@/components/client/dashboard/utils/iro/stakeholder-selection"

// const DualEssentiality = () => {
//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return <StakeholderSelection />;
//       case 1:
//         return <IroAssessmentSelection />;
//       case 2:
//         return <IROAssessment />;
//       case 3:
//         return <Reporting />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Stepper>{renderStepContent}</Stepper>
//     </>
//   );
// };

// export default DualEssentiality;