$(function(){
    let currentStep = 0;
    const steps = [...$('.steps div')];
    let vistedSteps = {
        0: true,
        1: false,
        2: false
    };
    steps.forEach((el,index) => {
        $(el).click(() => {
            if (vistedSteps[index]) {
                currentStep = index;
                renderCorrectStep();
            }
            else {
                alert('Make sure Previous step is complete, before Navigating from heres')
            }
        })
    });
    const renderCorrectStep =  () => {
        const stepsContainers = [...$('.step__container')];
        switch(currentStep) {
            case 0:
                $(stepsContainers[0]).css('display', 'block');
                $(stepsContainers[1]).css('display', 'none');
                $(stepsContainers[2]).css('display', 'none');
                $(steps[0]).addClass('active-step');
                $(steps[1]).removeClass('active-step');
                $(steps[2]).removeClass('active-step');
                break;
            case 1:
                $(steps[0]).removeClass('active-step')
                $(steps[1]).addClass('active-step')
                $(steps[2]).removeClass('active-step')
                $(stepsContainers[0]).css('display', 'none');
                $(stepsContainers[1]).css('display', 'block');
                $(stepsContainers[2]).css('display', 'none');
                const numOfAdvertise = newCampaignFormData['advertiseFiles'] || 1; // Getting the advertise Number out of newCampaign Object
                const filesContainer = $('#advertiseFilesForm');
                if (!vistedSteps[1]) {
                    for (let i = 1; i <= numOfAdvertise; i++) {
                        const fileContainer = $("<div class='file-container'></div>");
                        fileContainer.css('border-bottom', '1px solid #363636');
                        const titleContainer =         $('<div class="form-group form-group__size"> </div>');
                        const titleLabel =             $('<label>File Title</label>');
                        const titleInput =             $('<input type="text" class="form-control" required/>');
  
                        const runTimeContainer =       $('<div class="form-group form-group__size"> </div>');
                        const runtTimeLabel =          $('<label>Run Time Campaign</label>');
                        const runTimeInput =           $('<input type="text" class="form-control" required/>');
                        const timeOfDisplayContainer = $('<div class="general-settings__step-select"> </div>');
                        const broadCastingContainer =  $('<div class="general-settings__step-select"> </div>');
                        const typeOfRoadsContainer =   $('<div class="general-settings__step-select"> </div>');
                        const timeOfDisplayLabel =     $('<label>Time Of Display</label>');
                        const broadCastingLabel =      $('<label>BroadCasting Areas</label>');
                        const typeOfRoadsLabel =       $('<label>Time Of Display</label>');
                        timeOfDisplayContainer.append(timeOfDisplayLabel);
                        broadCastingContainer.append(broadCastingLabel);
                        typeOfRoadsContainer.append(typeOfRoadsLabel);
                        typeOfRoadsLabel.append(typeOfRoadsLabel);
                        const timeOfDisplayCheckboxes = dynamicCheckBoxesCreator(timeOfDisplayParams, i);
                        const broadCastingCheckboxes = dynamicCheckBoxesCreator(broadCastingParams, i);
                        const typeOfRoadCheckboxes = dynamicCheckBoxesCreator(typeOfRoadsParams, i);
              
                      timeOfDisplayContainer.append(timeOfDisplayCheckboxes);
                      broadCastingContainer.append(broadCastingCheckboxes);
                      typeOfRoadsContainer.append(typeOfRoadCheckboxes);
                      titleContainer.append(titleLabel);
                      titleContainer.append(titleInput);
                      runTimeContainer.append(runtTimeLabel);
                      runTimeContainer.append(runTimeInput);
                      fileContainer.append(titleContainer);
                      fileContainer.append(runTimeContainer);
                      fileContainer.append(timeOfDisplayContainer);
                      fileContainer.append(broadCastingContainer);
                      fileContainer.append(typeOfRoadsContainer);
                      filesContainer.append(fileContainer);
                  }
                }
                vistedSteps = {...vistedSteps, 1: true}
                break;
            case 2:
                vistedSteps = {...vistedSteps, 2: true}
                $(steps[0]).removeClass('active-step')
                $(steps[1]).removeClass('active-step')
                $(steps[2]).addClass('active-step')
                $(stepsContainers[0]).css('display', 'none');
                $(stepsContainers[1]).css('display', 'none');
                $(stepsContainers[2]).css('display', 'block');
        }
      };
    const timeOfDisplayParams = [
          {label: 'Morning', value: 'morning'},
          {label: 'Noon', value: 'noon'},
          {label: 'Evening', value: 'evening'},
      ];
    const broadCastingParams = [
          {label: 'Schools', value: 'schools'},
          {label: 'Offices', value: 'offices'},
          {label: 'Hospitals', value: 'hospitals'},
          {label: 'Shopping Centers', value: 'shopping centers'},
          {label: 'Restaurants', value: 'restaurants'},
          ];
    const typeOfRoadsParams = [
          {label: 'High-Way', value: 'high-way'},
          {label: 'Urban', value: 'urban'},
          {label: 'Inter-Urban Roads', value: 'inter-urban roads'},
      ];
    const dynamicCheckBoxesCreator = (params, numOfFile) => {
       const checkboxesContainer = $('<div> </div>');
       for (let param of params) {
           const checkboxContainer = $('<div class="custom-control custom-checkbox"></div>');
           const checkboxInput = $('<input class="custom-control-input" /> ');
           const checkBoxLabel = $('<label class="custom-control-label"></label> ');
           const labelTextNode = $(document.createTextNode(param['label']));
           checkboxInput.attr('value',param['value']);
           checkboxInput.attr('type', 'checkbox');
           checkboxInput.attr('id',param['value'] + numOfFile);
           checkBoxLabel.attr('for', param['value'] + numOfFile);
           checkBoxLabel.append(labelTextNode);
           checkboxContainer.append(checkboxInput);
           checkboxContainer.append(checkBoxLabel);
           checkboxesContainer.append(checkboxContainer);
       }
       return checkboxesContainer;
   };
 
   const newCampaignFormData = {
       campaignName: '',
       campaignDuration: '',
       campaignCategory: '',
       campaignAreas: [],
   };
   const updateCampaignFormData = (key, value) => {
       newCampaignFormData[key] = value
   };
   const campaignName     = $("#campaignName");
   const campaignDuration = $("input[name='campaignDur']");
   const campaignCategory = $("input[name='mainCat']");
   const campaignAreas    = $("input[type='checkbox']");
   const advertiseFilesInput = $('#advertiseFiles');
   advertiseFilesInput.change(e => {
       if (e.target.value > 3) {
        advertiseFilesInput.val(3)   
        advertiseFilesInput.addClass('valid');
        updateCampaignFormData('advertiseFiles', 3)
       }
       return  updateCampaignFormData('advertiseFiles', e.target.value)

   });
   [...campaignAreas].forEach(checkboxEl =>  {
       const checkboxJq = $(checkboxEl);
       checkboxJq.click(e => {
       const isChecked = checkboxJq.prop('checked');
       if(isChecked) {
          newCampaignFormData['campaignAreas'].push(e.target.value)
      } else {
           newCampaignFormData['campaignAreas'] = newCampaignFormData['campaignAreas'].filter(area => {
              return area !== e.target.value
           })
       }
   })
       });
   campaignDuration.click(e => updateCampaignFormData('campaignDuration', e.target.value));
   campaignCategory.click(e => updateCampaignFormData('campaignCategory', e.target.value));
   campaignName.keypress (e => updateCampaignFormData('campaignName',     e.target.value));

   const firstStepForm = $('#stepOneForm');
   firstStepForm.submit(el => {
    console.log(currentStep )   
    currentStep++;
    renderCorrectStep()
    el.preventDefault();
   });  
   // Create Dynamic Advertise Inputs
      renderCorrectStep()
  });
  