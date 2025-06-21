// Company Goal Tracker Application - Hierarchical Structure
class GoalTracker {
    constructor() {
        this.companyObjective = null;
        this.strategicGoals = [];
        this.subgoals = [];
        this.managerGoals = [];
        this.employees = [];
        this.departments = [];
        this.charts = {};
        this.currentProgressGoalId = null;
        
        this.init();
    }

    init() {
        console.log('Initializing GoalTracker...');
        this.loadData();
        
        // Initialize with dummy data if no data exists
        if (this.departments.length === 0 && this.employees.length === 0) {
            this.initializeDummyData();
        }
        
        console.log('Data loaded, rendering dashboard...');
        this.renderDashboard();
        console.log('Dashboard rendered, setting up event listeners...');
        this.setupEventListeners();
        console.log('Event listeners set up, initializing charts...');
        this.initializeCharts();
        console.log('Charts initialized, setting up filters...');
        this.setupFilters();
        console.log('GoalTracker initialization complete!');
    }

    initializeDummyData() {
        console.log('Initializing dummy data...');
        
        // Add departments
        const departments = [
            { id: 1, name: 'Business Development' },
            { id: 2, name: 'HR' },
            { id: 3, name: 'Finance' },
            { id: 4, name: 'Development Team' },
            { id: 5, name: 'BA Team' },
            { id: 6, name: 'Support Team' },
            { id: 7, name: 'Customer Operations Team' }
        ];
        
        this.departments = departments;
        
        // Add employees - Management level (7 people)
        const managementEmployees = [
            { id: 1, name: 'Sarah Johnson', departmentId: 1, role: 'VP Business Development' },
            { id: 2, name: 'Michael Chen', departmentId: 2, role: 'VP Human Resources' },
            { id: 3, name: 'Emily Rodriguez', departmentId: 3, role: 'VP Finance' },
            { id: 4, name: 'David Kim', departmentId: 4, role: 'VP Engineering' },
            { id: 5, name: 'Lisa Thompson', departmentId: 5, role: 'VP Business Analysis' },
            { id: 6, name: 'Robert Wilson', departmentId: 6, role: 'VP Customer Support' },
            { id: 7, name: 'Jennifer Davis', departmentId: 7, role: 'VP Customer Operations' }
        ];
        
        // Add manager level employees from each department
        const managerEmployees = [
            // Business Development Managers
            { id: 8, name: 'Alex Martinez', departmentId: 1, role: 'Senior Business Development Manager' },
            { id: 9, name: 'Rachel Green', departmentId: 1, role: 'Business Development Manager' },
            
            // HR Managers
            { id: 10, name: 'Kevin Brown', departmentId: 2, role: 'Senior HR Manager' },
            { id: 11, name: 'Amanda Lee', departmentId: 2, role: 'HR Manager' },
            
            // Finance Managers
            { id: 12, name: 'Daniel Taylor', departmentId: 3, role: 'Senior Finance Manager' },
            { id: 13, name: 'Sophie Anderson', departmentId: 3, role: 'Finance Manager' },
            
            // Development Team Managers
            { id: 14, name: 'James Miller', departmentId: 4, role: 'Senior Development Manager' },
            { id: 15, name: 'Natalie White', departmentId: 4, role: 'Development Manager' },
            
            // BA Team Managers
            { id: 16, name: 'Christopher Garcia', departmentId: 5, role: 'Senior Business Analyst Manager' },
            { id: 17, name: 'Maria Lopez', departmentId: 5, role: 'Business Analyst Manager' },
            
            // Support Team Managers
            { id: 18, name: 'Andrew Clark', departmentId: 6, role: 'Senior Support Manager' },
            { id: 19, name: 'Jessica Hall', departmentId: 6, role: 'Support Manager' },
            
            // Customer Operations Managers
            { id: 20, name: 'Ryan Moore', departmentId: 7, role: 'Senior Customer Operations Manager' },
            { id: 21, name: 'Stephanie Adams', departmentId: 7, role: 'Customer Operations Manager' }
        ];
        
        // Combine all employees
        this.employees = [...managementEmployees, ...managerEmployees];
        
        // Add a sample company objective if none exists
        if (!this.companyObjective) {
            this.companyObjective = {
                id: Date.now(),
                name: 'Achieve revenue target of $5 Million',
                value: 5000000,
                period: 'Annual',
                year: 2024,
                description: 'Increase company revenue to $5 million through strategic business development, product improvements, and customer expansion initiatives.',
                createdAt: new Date().toISOString(),
                progress: 0
            };
        }
        
        // Add sample strategic goals if none exist
        if (this.strategicGoals.length === 0) {
            this.strategicGoals = [
                {
                    id: 1,
                    name: 'Expand Market Presence',
                    description: 'Increase market share by 25% through strategic partnerships and new market entry',
                    weightage: 30,
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 2,
                    name: 'Enhance Product Portfolio',
                    description: 'Launch 3 new product features and improve existing product performance',
                    weightage: 25,
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 3,
                    name: 'Improve Customer Satisfaction',
                    description: 'Achieve 95% customer satisfaction score and reduce churn rate by 15%',
                    weightage: 20,
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 4,
                    name: 'Optimize Operational Efficiency',
                    description: 'Reduce operational costs by 20% while maintaining service quality',
                    weightage: 15,
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 5,
                    name: 'Strengthen Team Capabilities',
                    description: 'Invest in team development and implement new training programs',
                    weightage: 10,
                    createdAt: new Date().toISOString(),
                    progress: 0
                }
            ];
        }
        
        // Add sample subgoals if none exist
        if (this.subgoals.length === 0) {
            this.subgoals = [
                {
                    id: 1,
                    strategicGoalId: 1,
                    name: 'Establish Strategic Partnerships',
                    description: 'Form partnerships with 5 key industry players to expand market reach',
                    weightage: 40,
                    timeline: '6 months',
                    priority: 'High',
                    successMetrics: 'Sign 5 partnership agreements, achieve 15% revenue growth from partnerships',
                    assignments: [
                        {
                            personId: 1,
                            role: 'Partnership Lead',
                            weightage: 60,
                            individualMetrics: 'Negotiate and finalize 3 major partnership deals',
                            targetDate: '2024-06-30',
                            progress: 25,
                            completedMetrics: [0] // First task completed
                        },
                        {
                            personId: 8,
                            role: 'Business Development Coordinator',
                            weightage: 40,
                            individualMetrics: 'Identify and qualify 10 potential partners',
                            targetDate: '2024-05-15',
                            progress: 40,
                            completedMetrics: [0, 1] // First two tasks completed
                        }
                    ],
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 2,
                    strategicGoalId: 2,
                    name: 'Product Feature Development',
                    description: 'Develop and launch 3 new product features based on customer feedback',
                    weightage: 50,
                    timeline: '4 months',
                    priority: 'High',
                    successMetrics: 'Launch 3 features, achieve 80% adoption rate within 3 months',
                    assignments: [
                        {
                            personId: 4,
                            role: 'Technical Lead',
                            weightage: 50,
                            individualMetrics: 'Lead development of 2 major features',
                            targetDate: '2024-04-30',
                            progress: 60
                        },
                        {
                            personId: 16,
                            role: 'Requirements Analyst',
                            weightage: 30,
                            individualMetrics: 'Complete requirements analysis for all 3 features',
                            targetDate: '2024-02-28',
                            progress: 90
                        },
                        {
                            personId: 14,
                            role: 'Development Manager',
                            weightage: 20,
                            individualMetrics: 'Coordinate development team and ensure timely delivery',
                            targetDate: '2024-04-30',
                            progress: 45
                        }
                    ],
                    createdAt: new Date().toISOString(),
                    progress: 0
                },
                {
                    id: 3,
                    strategicGoalId: 3,
                    name: 'Customer Experience Enhancement',
                    description: 'Implement customer feedback system and improve support processes',
                    weightage: 60,
                    timeline: '3 months',
                    priority: 'Medium',
                    successMetrics: 'Achieve 95% customer satisfaction, reduce response time by 30%',
                    assignments: [
                        {
                            personId: 7,
                            role: 'Customer Experience Lead',
                            weightage: 40,
                            individualMetrics: 'Implement new feedback system and achieve 95% satisfaction',
                            targetDate: '2024-03-31',
                            progress: 70
                        },
                        {
                            personId: 6,
                            role: 'Support Process Manager',
                            weightage: 35,
                            individualMetrics: 'Reduce support response time by 30%',
                            targetDate: '2024-03-31',
                            progress: 55
                        },
                        {
                            personId: 20,
                            role: 'Operations Coordinator',
                            weightage: 25,
                            individualMetrics: 'Streamline customer onboarding process',
                            targetDate: '2024-03-15',
                            progress: 80
                        }
                    ],
                    createdAt: new Date().toISOString(),
                    progress: 0
                }
            ];
        }
        
        // Save the dummy data
        this.saveData();
        console.log('Dummy data initialized successfully!');
    }

    // Data Management
    loadData() {
        this.companyObjective = JSON.parse(localStorage.getItem('companyObjective') || 'null');
        this.strategicGoals = JSON.parse(localStorage.getItem('strategicGoals') || '[]');
        this.subgoals = JSON.parse(localStorage.getItem('subgoals') || '[]');
        this.managerGoals = JSON.parse(localStorage.getItem('managerGoals') || '[]');
        this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
        this.departments = JSON.parse(localStorage.getItem('departments') || '[]');
    }

    saveData() {
        localStorage.setItem('companyObjective', JSON.stringify(this.companyObjective));
        localStorage.setItem('strategicGoals', JSON.stringify(this.strategicGoals));
        localStorage.setItem('subgoals', JSON.stringify(this.subgoals));
        localStorage.setItem('managerGoals', JSON.stringify(this.managerGoals));
        localStorage.setItem('employees', JSON.stringify(this.employees));
        localStorage.setItem('departments', JSON.stringify(this.departments));
    }

    // Event Listeners
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            console.log('DOM still loading, waiting...');
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
            return;
        }

        // Use event delegation for dynamically created elements
        document.addEventListener('click', (e) => {
            const target = e.target;
            console.log('Click detected on:', target.id || target.className || target.tagName);

            // Goal modal buttons
            if (target.id === 'cancelGoalBtn') {
                console.log('Cancel goal button clicked');
                this.hideGoalModal();
            } else if (target.id === 'saveGoalBtn') {
                console.log('Save goal button clicked');
                this.handleSaveGoal();
            }

            // Configuration modal buttons
            if (target.id === 'closeConfigBtn') {
                this.hideConfigModal();
            } else if (target.id === 'addDepartmentBtn') {
                this.addDepartment();
            } else if (target.id === 'addEmployeeBtn') {
                this.addEmployee();
            }

            // Quick action buttons
            if (target.id === 'addCompanyObjectiveBtn') {
                this.showCompanyObjectiveModal();
            } else if (target.id === 'editCompanyObjectiveBtn') {
                this.showCompanyObjectiveModal();
            } else if (target.id === 'addStrategicGoalBtn') {
                this.addStrategicGoal();
            } else if (target.id === 'addSubgoalBtn') {
                this.addSubgoal();
            } else if (target.id === 'showConfigBtn' || target.id === 'addDepartmentBtn' || target.id === 'addEmployeeBtn') {
                this.showConfigModal();
            } else if (target.id === 'showGoalMapBtn') {
                this.showGoalMap();
            } else if (target.id === 'backToDashboardBtn') {
                this.renderDashboard();
            } else if (target.id === 'exportDataBtn') {
                this.exportToCSV();
            } else if (target.id === 'resetDataBtn') {
                if (confirm('This will clear all existing data and load sample data. Are you sure?')) {
                    this.resetToDummyData();
                }
            }

            // Edit and delete buttons (using data attributes)
            if (target.classList.contains('edit-strategic-goal')) {
                const goalId = parseInt(target.getAttribute('data-goal-id'));
                this.editStrategicGoal(goalId);
            } else if (target.classList.contains('delete-strategic-goal')) {
                const goalId = parseInt(target.getAttribute('data-goal-id'));
                if (confirm('Are you sure you want to delete this strategic goal?')) {
                    this.deleteStrategicGoal(goalId);
                }
            } else if (target.classList.contains('edit-subgoal')) {
                const subgoalId = parseInt(target.getAttribute('data-subgoal-id'));
                this.editSubgoal(subgoalId);
            } else if (target.classList.contains('delete-subgoal')) {
                const subgoalId = parseInt(target.getAttribute('data-subgoal-id'));
                if (confirm('Are you sure you want to delete this subgoal?')) {
                    this.deleteSubgoal(subgoalId);
                }
            } else if (target.classList.contains('add-subgoal-to-strategic')) {
                const strategicGoalId = parseInt(target.getAttribute('data-strategic-goal-id'));
                this.addSubgoal(strategicGoalId);
            }

            // Progress update buttons
            if (target.classList.contains('update-progress-btn')) {
                const goalId = parseInt(target.getAttribute('data-goal-id'));
                this.showProgressModal(goalId);
            }

            // Department and employee delete buttons
            if (target.classList.contains('delete-department')) {
                const deptId = parseInt(target.getAttribute('data-dept-id'));
                if (confirm('Are you sure you want to delete this department?')) {
                    this.deleteDepartment(deptId);
                }
            } else if (target.classList.contains('delete-employee')) {
                const empId = parseInt(target.getAttribute('data-emp-id'));
                if (confirm('Are you sure you want to delete this employee?')) {
                    this.deleteEmployee(empId);
                }
            }

            // Close modal buttons
            if (target.classList.contains('close-modal')) {
                const modal = target.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            }

            // Progress modal buttons
            if (target.id === 'saveProgressBtn') {
                this.saveProgress();
            } else if (target.id === 'cancelProgressBtn') {
                this.hideProgressModal();
            }

            // Add Person Assignment button in subgoal modal
            if (target.classList.contains('add-person-assignment')) {
                this.addPersonAssignment();
            }

            // Strategic goal card click
            if (target.closest('.strategic-goal-card')) {
                const card = target.closest('.strategic-goal-card');
                const strategicGoalId = parseInt(card.getAttribute('data-strategic-goal-id'));
                this.showStrategicGoalDetails(strategicGoalId);
            }
        });

        // Assignment weightage validation
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('person-weightage')) {
                this.validateAssignmentWeightages();
            }
        });
    }

    // Handle different types of goal saving
    handleSaveGoal() {
        const buttonText = document.getElementById('saveGoalBtn').textContent;
        
        if (buttonText === 'Save Strategic Goal') {
            this.saveStrategicGoal();
        } else if (buttonText === 'Update Strategic Goal') {
            const editId = document.getElementById('saveGoalBtn').getAttribute('data-edit-id');
            if (editId) {
                this.updateStrategicGoal(parseInt(editId));
            }
        } else if (buttonText === 'Save Subgoal') {
            this.saveSubgoal();
        } else if (buttonText === 'Update Subgoal') {
            const editId = document.getElementById('saveGoalBtn').getAttribute('data-edit-subgoal-id');
            if (editId) {
                this.updateSubgoal(parseInt(editId));
            }
        } else {
            this.saveCompanyObjective();
        }
    }

    // Modal Management
    showGoalModal(goalId = null) {
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        
        if (goalId) {
            const goal = this.goals.find(g => g.id === goalId);
            if (goal) {
                this.populateGoalForm(goal);
                title.textContent = 'Edit Goal';
            }
        } else {
            this.clearGoalForm();
            title.textContent = 'Add New Goal';
        }
        
        modal.classList.remove('hidden');
    }

    hideGoalModal() {
        const modal = document.getElementById('goalModal');
        modal.classList.add('hidden');
        
        // Reset the form to company objective form
        this.clearCompanyObjectiveForm();
        document.getElementById('saveGoalBtn').textContent = 'Save Goal';
    }

    showCompanyObjectiveModal() {
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        
        if (this.companyObjective) {
            this.populateCompanyObjectiveForm();
            title.textContent = 'Edit Company Objective';
        } else {
            this.clearCompanyObjectiveForm();
            title.textContent = 'Set Company Objective';
        }
        
        modal.classList.remove('hidden');
    }

    hideCompanyObjectiveModal() {
        this.hideGoalModal();
    }

    showConfigModal() {
        const modal = document.getElementById('configModal');
        this.renderDepartmentsList();
        this.renderEmployeesList();
        this.updateDepartmentSelect();
        modal.classList.remove('hidden');
    }

    hideConfigModal() {
        document.getElementById('configModal').classList.add('hidden');
    }

    showProgressModal(goalId) {
        this.currentProgressGoalId = goalId;
        const modal = document.getElementById('progressModal');
        this.renderProgressForm(goalId);
        modal.classList.remove('hidden');
    }

    hideProgressModal() {
        document.getElementById('progressModal').classList.add('hidden');
        this.currentProgressGoalId = null;
    }

    saveProgress() {
        if (!this.currentProgressGoalId) return;

        const progressInputs = document.querySelectorAll('.progress-input');
        let totalProgress = 0;
        let validInputs = 0;

        progressInputs.forEach(input => {
            const progress = parseFloat(input.value) || 0;
            if (progress >= 0 && progress <= 100) {
                totalProgress += progress;
                validInputs++;
            }
        });

        if (validInputs === 0) {
            alert('Please enter valid progress values (0-100)');
            return;
        }

        const averageProgress = totalProgress / validInputs;
        
        // Update the goal progress
        const goal = this.subgoals.find(g => g.id === this.currentProgressGoalId);
        if (goal) {
            goal.progress = averageProgress;
            this.saveData();
            this.renderDashboard();
            this.hideProgressModal();
        }
    }

    renderProgressForm(goalId) {
        const goal = this.subgoals.find(g => g.id === goalId);
        if (!goal) return;

        const modalBody = document.getElementById('progressModalBody');
        let formHTML = `
            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">Update Progress: ${goal.name}</h3>
                <p class="text-gray-600 mb-4">Current Progress: ${goal.progress || 0}%</p>
            </div>
        `;

        if (goal.assignments && goal.assignments.length > 0) {
            formHTML += '<div class="space-y-4">';
            goal.assignments.forEach(assignment => {
                const person = this.employees.find(emp => emp.id === assignment.personId);
                formHTML += `
                    <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium">${person ? person.name : 'Unknown'}</span>
                            <span class="text-sm text-gray-500">${assignment.role}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <label class="text-sm text-gray-600">Progress:</label>
                            <input type="number" 
                                   class="progress-input w-20 px-2 py-1 border rounded text-sm" 
                                   value="${assignment.progress || 0}" 
                                   min="0" 
                                   max="100" 
                                   step="0.1">
                            <span class="text-sm text-gray-500">%</span>
                        </div>
                    </div>
                `;
            });
            formHTML += '</div>';
        } else {
            formHTML += `
                <div class="border rounded-lg p-4">
                    <div class="flex items-center space-x-2">
                        <label class="text-sm text-gray-600">Overall Progress:</label>
                        <input type="number" 
                               class="progress-input w-20 px-2 py-1 border rounded text-sm" 
                               value="${goal.progress || 0}" 
                               min="0" 
                               max="100" 
                               step="0.1">
                        <span class="text-sm text-gray-500">%</span>
                    </div>
                </div>
            `;
        }

        modalBody.innerHTML = formHTML;
    }

    // Company Objective Management
    clearCompanyObjectiveForm() {
        document.getElementById('goalName').value = '';
        document.getElementById('goalValue').value = '';
        document.getElementById('goalPeriod').value = '';
        document.getElementById('goalYear').value = '2024';
        document.getElementById('goalDescription').value = '';
    }

    populateCompanyObjectiveForm() {
        if (!this.companyObjective) return;
        
        document.getElementById('goalName').value = this.companyObjective.name;
        document.getElementById('goalValue').value = this.companyObjective.value;
        document.getElementById('goalPeriod').value = this.companyObjective.period;
        document.getElementById('goalYear').value = this.companyObjective.year;
        document.getElementById('goalDescription').value = this.companyObjective.description;
    }

    saveCompanyObjective() {
        const form = document.getElementById('goalForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        this.companyObjective = {
            id: Date.now(),
            name: document.getElementById('goalName').value,
            value: parseFloat(document.getElementById('goalValue').value),
            period: document.getElementById('goalPeriod').value,
            year: parseInt(document.getElementById('goalYear').value),
            description: document.getElementById('goalDescription').value,
            createdAt: new Date().toISOString(),
            progress: 0
        };

        this.saveData();
        this.renderDashboard();
        this.hideGoalModal();
    }

    // Strategic Goals Management
    addStrategicGoal(name, description, weightage) {
        const strategicGoal = {
            id: Date.now(),
            name: name,
            description: description,
            weightage: weightage, // Percentage contribution to company objective
            createdAt: new Date().toISOString(),
            progress: 0
        };

        this.strategicGoals.push(strategicGoal);
        this.saveData();
        this.renderDashboard();
        return strategicGoal;
    }

    // Subgoals Management
    addSubgoal(strategicGoalId, name, description, weightage) {
        const subgoal = {
            id: Date.now(),
            strategicGoalId: strategicGoalId,
            name: name,
            description: description,
            weightage: weightage, // Percentage contribution to strategic goal
            createdAt: new Date().toISOString(),
            progress: 0
        };

        this.subgoals.push(subgoal);
        this.saveData();
        this.renderDashboard();
        return subgoal;
    }

    // Manager Goals Management
    addManagerGoal(subgoalId, managerId, name, description, weightage) {
        const managerGoal = {
            id: Date.now(),
            subgoalId: subgoalId,
            managerId: managerId,
            name: name,
            description: description,
            weightage: weightage, // Percentage contribution to subgoal
            createdAt: new Date().toISOString(),
            progress: 0
        };

        this.managerGoals.push(managerGoal);
        this.saveData();
        this.renderDashboard();
        return managerGoal;
    }

    // Employee Management
    addEmployee(name, departmentId, managerId = null) {
        const employee = {
            id: Date.now(),
            name: name,
            departmentId: parseInt(departmentId),
            managerId: managerId ? parseInt(managerId) : null,
            contributions: {}, // Employee contributions to manager goals
            createdAt: new Date().toISOString()
        };

        this.employees.push(employee);
        this.saveData();
        this.renderEmployeesList();
        return employee;
    }

    // Department Management
    addDepartment(name) {
        const department = {
            id: Date.now(),
            name: name
        };

        this.departments.push(department);
        this.saveData();
        this.renderDepartmentsList();
        this.updateDepartmentSelect();
        return department;
    }

    // Calculations
    calculateEmployeeContributionToCompany(employeeId) {
        const employee = this.employees.find(e => e.id === employeeId);
        if (!employee) return 0;

        let totalContribution = 0;

        // Get all manager goals this employee contributes to
        Object.keys(employee.contributions).forEach(managerGoalId => {
            const managerGoal = this.managerGoals.find(mg => mg.id === parseInt(managerGoalId));
            if (managerGoal) {
                const subgoal = this.subgoals.find(sg => sg.id === managerGoal.subgoalId);
                const strategicGoal = this.strategicGoals.find(sg => sg.id === subgoal?.strategicGoalId);
                
                if (subgoal && strategicGoal) {
                    // Calculate cascading weightage: Employee → Manager Goal → Subgoal → Strategic Goal → Company Objective
                    const employeeContribution = employee.contributions[managerGoalId] || 0;
                    const managerWeightage = managerGoal.weightage / 100;
                    const subgoalWeightage = subgoal.weightage / 100;
                    const strategicWeightage = strategicGoal.weightage / 100;
                    
                    totalContribution += employeeContribution * managerWeightage * subgoalWeightage * strategicWeightage;
                }
            }
        });

        return totalContribution;
    }

    calculateGoalProgress(goalId, type) {
        if (type === 'subgoal') {
            const subgoal = this.subgoals.find(sg => sg.id === goalId);
            if (!subgoal || !subgoal.assignments || subgoal.assignments.length === 0) {
                return 0;
            }
            
            // Calculate weighted progress based on individual person progress
            const totalWeightedProgress = subgoal.assignments.reduce((sum, assignment) => {
                return sum + (assignment.progress * assignment.weightage / 100);
            }, 0);
            
            return totalWeightedProgress;
        } else if (type === 'strategic') {
            const strategicGoal = this.strategicGoals.find(sg => sg.id === goalId);
            if (!strategicGoal) return 0;
            
            const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === goalId);
            if (subgoals.length === 0) return 0;
            
            const totalProgress = subgoals.reduce((sum, subgoal) => {
                const subgoalProgress = this.calculateGoalProgress(subgoal.id, 'subgoal');
                return sum + (subgoalProgress * subgoal.weightage / 100);
            }, 0);
            
            return totalProgress;
        } else if (type === 'company') {
            if (this.strategicGoals.length === 0) return 0;
            
            const totalProgress = this.strategicGoals.reduce((sum, strategicGoal) => {
                const strategicProgress = this.calculateGoalProgress(strategicGoal.id, 'strategic');
                return sum + (strategicProgress * strategicGoal.weightage / 100);
            }, 0);
            
            return totalProgress;
        }
        return 0;
    }

    calculateOverallCompanyProgress() {
        if (!this.companyObjective || this.strategicGoals.length === 0) return 0;
        
        const totalWeightedProgress = this.strategicGoals.reduce((total, sg) => {
            return total + (sg.progress * sg.weightage / 100);
        }, 0);
        
        return totalWeightedProgress;
    }

    // Dashboard Rendering
    renderDashboard() {
        const container = document.getElementById('dashboard');
        if (!container) {
            console.error('Dashboard container not found');
            return;
        }

        // If no company objective exists, show initial setup
        if (!this.companyObjective) {
            container.innerHTML = `
                <div class="min-h-screen bg-gray-50">
                    <!-- Header -->
                    <div class="bg-white shadow-sm border-b">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="flex justify-between items-center py-4">
                                <div>
                                    <h1 class="text-2xl font-bold text-gray-900">Company Goal Tracker</h1>
                                    <p class="text-gray-600">Track and manage organizational objectives</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Welcome Screen -->
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div class="text-center">
                            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h2 class="text-3xl font-bold text-gray-900 mb-4">Welcome to Company Goal Tracker</h2>
                            <p class="text-lg text-gray-600 mb-8">Let's get started by setting up your company objective and organizational structure.</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                                <div class="bg-white rounded-lg shadow-sm border p-6">
                                    <div class="text-blue-600 text-2xl mb-2">1</div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Set Company Objective</h3>
                                    <p class="text-gray-600 text-sm">Define your main organizational goal with target values and timelines.</p>
                                </div>
                                <div class="bg-white rounded-lg shadow-sm border p-6">
                                    <div class="text-blue-600 text-2xl mb-2">2</div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Add Departments & People</h3>
                                    <p class="text-gray-600 text-sm">Set up your organizational structure with departments and employees.</p>
                                </div>
                                <div class="bg-white rounded-lg shadow-sm border p-6">
                                    <div class="text-blue-600 text-2xl mb-2">3</div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Create Strategic Goals</h3>
                                    <p class="text-gray-600 text-sm">Break down your objective into strategic goals and actionable subgoals.</p>
                                </div>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onclick="goalTracker.showCompanyObjectiveModal()" class="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium">
                                    Set Company Objective
                                </button>
                                <button onclick="goalTracker.showConfigModal()" class="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 font-medium">
                                    Add Departments & People
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const companyProgress = this.calculateGoalProgress(0, 'company');
        const progressClass = companyProgress >= 70 ? 'text-green-600' : companyProgress >= 50 ? 'text-yellow-600' : 'text-red-600';
        
        // Calculate KPIs
        const totalStrategicGoals = this.strategicGoals.length;
        const totalSubgoals = this.subgoals.length;
        const totalEmployees = this.employees.length;
        const overdueAssignments = this.calculateOverdueAssignments();
        
        container.innerHTML = `
            <div class="bg-gray-50">
                <!-- Header with Quick Actions -->
                <div class="bg-white shadow-sm border-b">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center py-4">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">Company Goal Tracker</h1>
                                <p class="text-gray-600">Track and manage organizational objectives</p>
                            </div>
                            <div class="flex space-x-3">
                                <button id="showGoalMapBtn" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                                    Goal Map
                                </button>
                                <button id="exportDataBtn" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                    Export CSV
                                </button>
                                <button id="resetDataBtn" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                    Reset Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Breadcrumb Navigation -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="flex items-center space-x-2">
                            <li>
                                <div class="flex items-center">
                                    <span class="text-gray-500 hover:text-gray-700 cursor-pointer">Dashboard</span>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="flex-shrink-0 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-2 text-gray-900 font-medium">${this.companyObjective.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <!-- Main Content -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Search and Filters -->
                    <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input type="text" id="searchInput" placeholder="Search goals, people..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select id="departmentFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Departments</option>
                                    ${this.departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select id="priorityFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Priorities</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                                <select id="progressFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Progress</option>
                                    <option value="high">High (70%+)</option>
                                    <option value="medium">Medium (50-69%)</option>
                                    <option value="low">Low (<50%)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- KPI Dashboard -->
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <div class="bg-white rounded-lg shadow-sm border p-4 text-center">
                            <div class="text-2xl font-bold text-blue-600">${companyProgress.toFixed(1)}%</div>
                            <div class="text-sm text-gray-500">Overall Progress</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-4 text-center">
                            <div class="text-2xl font-bold text-green-600">${totalStrategicGoals}</div>
                            <div class="text-sm text-gray-500">Strategic Goals</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-4 text-center">
                            <div class="text-2xl font-bold text-purple-600">${totalSubgoals}</div>
                            <div class="text-sm text-gray-500">Subgoals</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-4 text-center">
                            <div class="text-2xl font-bold text-orange-600">${totalEmployees}</div>
                            <div class="text-sm text-gray-500">Employees</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-4 text-center">
                            <div class="text-2xl font-bold text-red-600">${overdueAssignments}</div>
                            <div class="text-sm text-gray-500">Overdue</div>
                        </div>
                    </div>

                    <!-- Charts Section -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div class="bg-white rounded-lg shadow-sm border p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                            <div class="chart-container">
                                <canvas id="progressChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                            <div class="chart-container">
                                <canvas id="departmentChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Timeline View -->
                    <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                        <div id="timelineContainer" class="space-y-3">
                            ${this.renderTimelineView()}
                        </div>
                    </div>

                    <!-- Company Objective -->
                    <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900">${this.companyObjective.name}</h2>
                                <p class="text-gray-600 mt-1">${this.companyObjective.description}</p>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold ${progressClass}">${companyProgress.toFixed(1)}%</div>
                                <div class="text-sm text-gray-500">Overall Progress</div>
                            </div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="progress-bar h-3 rounded-full ${companyProgress >= 70 ? '' : companyProgress >= 50 ? 'warning' : 'danger'}" style="width: ${companyProgress}%"></div>
                        </div>
                        <div class="mt-4 flex justify-end">
                            <button id="editCompanyObjectiveBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                                Edit Company Objective
                            </button>
                        </div>
                    </div>

                    <!-- Strategic Goals -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        ${this.strategicGoals.map(goal => {
                            const progress = this.calculateGoalProgress(goal.id, 'strategic');
                            const progressClass = progress >= 70 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
                            const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === goal.id);
                            
                            return `
                                <div class="strategic-goal-card bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-shadow" data-strategic-goal-id="${goal.id}">
                                    <div class="flex justify-between items-start mb-4">
                                        <div class="flex-1">
                                            <h3 class="text-lg font-semibold text-gray-900">${goal.name}</h3>
                                            <p class="text-gray-600 text-sm mt-1">${goal.description}</p>
                                            <div class="flex items-center space-x-4 mt-2 text-sm">
                                                <span class="text-gray-500">Weightage: ${goal.weightage}%</span>
                                                <span class="text-gray-500">Subgoals: ${subgoals.length}</span>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-xl font-bold ${progressClass}">${progress.toFixed(1)}%</div>
                                            <div class="text-sm text-gray-500">Progress</div>
                                        </div>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                                        <div class="progress-bar h-2 rounded-full ${progress >= 70 ? '' : progress >= 50 ? 'warning' : 'danger'}" style="width: ${progress}%"></div>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button class="add-subgoal-to-strategic bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm" data-strategic-goal-id="${goal.id}">
                                            Add Subgoal
                                        </button>
                                        <button class="edit-strategic-goal bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm" data-goal-id="${goal.id}">
                                            Edit
                                        </button>
                                        <button class="delete-strategic-goal bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm" data-goal-id="${goal.id}">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- Subgoals -->
                    ${this.strategicGoals.map(strategicGoal => {
                        const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === strategicGoal.id);
                        if (subgoals.length === 0) return '';
                        
                        return `
                            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                                <div class="flex justify-between items-center mb-6">
                                    <h3 class="text-xl font-semibold text-gray-900">Subgoals for ${strategicGoal.name}</h3>
                                    <span class="text-sm text-gray-500">${subgoals.length} subgoal${subgoals.length !== 1 ? 's' : ''}</span>
                                </div>
                                <div class="space-y-6">
                                    ${subgoals.map(subgoal => this.renderSubgoalSummary(subgoal)).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}

                    <!-- Action Buttons -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <div class="flex flex-wrap gap-4">
                            <button id="addStrategicGoalBtn" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                                Add Strategic Goal
                            </button>
                            <button id="addDepartmentBtn" class="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
                                Add Department
                            </button>
                            <button id="addEmployeeBtn" class="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
                                Add Employee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize charts after rendering
        this.initializeCharts();
        this.setupFilters();
    }

    renderSubgoalSummary(subgoal) {
        const progress = this.calculateGoalProgress(subgoal.id, 'subgoal');
        const progressClass = progress >= 70 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
        const priorityClass = subgoal.priority === 'High' ? 'text-red-600' : subgoal.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600';
        
        return `
            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <!-- Subgoal Header -->
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">${subgoal.name}</h4>
                        <p class="text-gray-600 text-sm mb-3">${subgoal.description}</p>
                        
                        <!-- Subgoal Meta Info -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div class="bg-white rounded-md p-3 border border-gray-200">
                                <div class="text-xs text-gray-500 mb-1">Weightage</div>
                                <div class="text-sm font-semibold text-blue-600">${subgoal.weightage}%</div>
                            </div>
                            <div class="bg-white rounded-md p-3 border border-gray-200">
                                <div class="text-xs text-gray-500 mb-1">Timeline</div>
                                <div class="text-sm font-semibold text-gray-900">${subgoal.timeline || 'Not set'}</div>
                            </div>
                            <div class="bg-white rounded-md p-3 border border-gray-200">
                                <div class="text-xs text-gray-500 mb-1">Priority</div>
                                <div class="text-sm font-semibold ${priorityClass}">${subgoal.priority || 'Not set'}</div>
                            </div>
                            <div class="bg-white rounded-md p-3 border border-gray-200">
                                <div class="text-xs text-gray-500 mb-1">Progress</div>
                                <div class="text-sm font-semibold ${progressClass}">${progress.toFixed(1)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="mb-4">
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="progress-bar h-3 rounded-full ${progress >= 70 ? '' : progress >= 50 ? 'warning' : 'danger'}" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <!-- Success Metrics -->
                ${subgoal.successMetrics ? `
                    <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div class="text-sm font-semibold text-blue-800 mb-2">🎯 Success Metrics</div>
                        <div class="text-sm text-blue-700">${subgoal.successMetrics}</div>
                    </div>
                ` : ''}
                
                <!-- Person Assignments -->
                ${subgoal.assignments && subgoal.assignments.length > 0 ? `
                    <div class="mb-4">
                        <div class="text-sm font-semibold text-gray-900 mb-3">👥 Person Assignments</div>
                        <div class="space-y-3">
                            ${subgoal.assignments.map(assignment => {
                                const person = this.employees.find(emp => emp.id === assignment.personId);
                                const dept = person ? this.departments.find(d => d.id === person.departmentId) : null;
                                const personProgressClass = assignment.progress >= 70 ? 'text-green-600' : assignment.progress >= 50 ? 'text-yellow-600' : 'text-red-600';
                                
                                return person ? `
                                    <div class="bg-white rounded-lg p-4 border border-gray-200">
                                        <div class="flex justify-between items-start mb-3">
                                            <div class="flex-1">
                                                <div class="flex items-center space-x-2 mb-1">
                                                    <span class="font-semibold text-gray-900">${person.name}</span>
                                                    <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">${dept ? dept.name : 'Unknown'}</span>
                                                    <span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">${assignment.weightage}%</span>
                                                </div>
                                                <div class="text-sm text-gray-600 mb-2">${assignment.role}</div>
                                                
                                                <!-- Individual Progress -->
                                                <div class="flex items-center space-x-3 mb-2">
                                                    <span class="text-sm ${personProgressClass} font-semibold">${assignment.progress.toFixed(1)}%</span>
                                                    <div class="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                                                        <div class="progress-bar h-2 rounded-full ${assignment.progress >= 70 ? '' : assignment.progress >= 50 ? 'warning' : 'danger'}" style="width: ${assignment.progress}%"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Individual Metrics -->
                                        ${assignment.individualMetrics ? `
                                            <div class="mb-3 p-3 bg-green-50 rounded-md border border-green-200">
                                                <div class="text-xs font-semibold text-green-800 mb-1">📋 Individual Metrics</div>
                                                <div class="text-xs text-green-700">${assignment.individualMetrics}</div>
                                            </div>
                                        ` : ''}
                                        
                                        <!-- Target Date and Progress -->
                                        <div class="flex justify-between items-center text-xs text-gray-500">
                                            <span>🎯 Target: ${assignment.targetDate ? new Date(assignment.targetDate).toLocaleDateString() : 'Not set'}</span>
                                            <span>📊 Progress: ${assignment.progress.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div class="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                    <button class="edit-subgoal bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm" data-subgoal-id="${subgoal.id}">
                        Edit
                    </button>
                    <button class="delete-subgoal bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm" data-subgoal-id="${subgoal.id}">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    showGoalMap() {
        const container = document.getElementById('dashboard');
        const companyProgress = this.calculateGoalProgress(0, 'company');
        
        container.innerHTML = `
            <div class="min-h-screen bg-gray-50">
                <!-- Header -->
                <div class="bg-white shadow-sm border-b">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center py-4">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">Goal Map</h1>
                                <p class="text-gray-600">High-level view of goals, achievements, and bottlenecks</p>
                            </div>
                            <div class="flex space-x-3">
                                <button id="backToDashboardBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Back to Dashboard
                                </button>
                                <button id="exportDataBtn" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Goal Map Content -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <!-- Company Overview -->
                    <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">${this.companyObjective.name}</h2>
                                <p class="text-gray-600 mt-2">${this.companyObjective.description}</p>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold ${companyProgress >= 70 ? 'text-green-600' : companyProgress >= 50 ? 'text-yellow-600' : 'text-red-600'}">${companyProgress.toFixed(1)}%</div>
                                <div class="text-sm text-gray-500">Overall Achievement</div>
                            </div>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-4">
                            <div class="progress-bar h-4 rounded-full ${companyProgress >= 70 ? '' : companyProgress >= 50 ? 'warning' : 'danger'}" style="width: ${companyProgress}%"></div>
                        </div>
                    </div>

                    <!-- Strategic Goals Map -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        ${this.strategicGoals.map(goal => {
                            const progress = this.calculateGoalProgress(goal.id, 'strategic');
                            const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === goal.id);
                            const totalAssignments = subgoals.reduce((sum, sg) => sum + (sg.assignments ? sg.assignments.length : 0), 0);
                            const avgPersonProgress = totalAssignments > 0 ? 
                                subgoals.reduce((sum, sg) => {
                                    if (!sg.assignments) return sum;
                                    return sum + sg.assignments.reduce((pSum, assignment) => pSum + assignment.progress, 0);
                                }, 0) / totalAssignments : 0;
                            
                            // Identify bottlenecks
                            const bottlenecks = [];
                            if (progress < 50) bottlenecks.push('Low overall progress');
                            if (subgoals.length === 0) bottlenecks.push('No subgoals defined');
                            if (totalAssignments === 0) bottlenecks.push('No person assignments');
                            if (avgPersonProgress < 30) bottlenecks.push('Low individual progress');
                            
                            // Check for overdue assignments
                            const overdueAssignments = subgoals.reduce((count, sg) => {
                                if (!sg.assignments) return count;
                                return count + sg.assignments.filter(assignment => {
                                    if (!assignment.targetDate) return false;
                                    return new Date(assignment.targetDate) < new Date() && assignment.progress < 100;
                                }).length;
                            }, 0);
                            
                            if (overdueAssignments > 0) bottlenecks.push(`${overdueAssignments} overdue assignment(s)`);
                            
                            return `
                                <div class="bg-white rounded-lg shadow-sm border p-6 relative">
                                    <div class="absolute top-4 right-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${progress >= 70 ? 'bg-green-100 text-green-800' : progress >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                                            ${progress >= 70 ? 'On Track' : progress >= 50 ? 'At Risk' : 'Critical'}
                                        </span>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2">${goal.name}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${goal.description}</p>
                                        
                                        <div class="flex justify-between items-center mb-3">
                                            <div class="text-center">
                                                <div class="text-2xl font-bold ${progress >= 70 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600'}">${progress.toFixed(1)}%</div>
                                                <div class="text-xs text-gray-500">Progress</div>
                                            </div>
                                            <div class="text-center">
                                                <div class="text-2xl font-bold text-blue-600">${subgoals.length}</div>
                                                <div class="text-xs text-gray-500">Subgoals</div>
                                            </div>
                                            <div class="text-center">
                                                <div class="text-2xl font-bold text-purple-600">${totalAssignments}</div>
                                                <div class="text-xs text-gray-500">People</div>
                                            </div>
                                        </div>
                                        
                                        <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                                            <div class="progress-bar h-2 rounded-full ${progress >= 70 ? '' : progress >= 50 ? 'warning' : 'danger'}" style="width: ${progress}%"></div>
                                        </div>
                                    </div>
                                    
                                    ${bottlenecks.length > 0 ? `
                                        <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                            <div class="text-sm font-medium text-red-800 mb-2">⚠️ Bottlenecks Identified:</div>
                                            <ul class="text-xs text-red-700 space-y-1">
                                                ${bottlenecks.map(bottleneck => `<li>• ${bottleneck}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : `
                                        <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <div class="text-sm font-medium text-green-800">✅ On Track</div>
                                        </div>
                                    `}
                                    
                                    <div class="text-xs text-gray-500 space-y-1">
                                        <div>Weightage: ${goal.weightage}%</div>
                                        <div>Avg Person Progress: ${avgPersonProgress.toFixed(1)}%</div>
                                        ${overdueAssignments > 0 ? `<div class="text-red-600">Overdue: ${overdueAssignments}</div>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- Key Metrics Summary -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-sm border p-6 text-center">
                            <div class="text-3xl font-bold text-blue-600">${this.strategicGoals.length}</div>
                            <div class="text-sm text-gray-500">Strategic Goals</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-6 text-center">
                            <div class="text-3xl font-bold text-green-600">${this.subgoals.length}</div>
                            <div class="text-sm text-gray-500">Subgoals</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-6 text-center">
                            <div class="text-3xl font-bold text-purple-600">${this.employees.length}</div>
                            <div class="text-sm text-gray-500">Employees</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border p-6 text-center">
                            <div class="text-3xl font-bold text-orange-600">${this.departments.length}</div>
                            <div class="text-sm text-gray-500">Departments</div>
                        </div>
                    </div>

                    <!-- Performance Insights -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">Top Performing Goals</h4>
                                <div class="space-y-2">
                                    ${this.strategicGoals
                                        .map(goal => ({...goal, progress: this.calculateGoalProgress(goal.id, 'strategic')}))
                                        .sort((a, b) => b.progress - a.progress)
                                        .slice(0, 3)
                                        .map(goal => `
                                            <div class="flex justify-between items-center p-2 bg-green-50 rounded-md">
                                                <span class="text-sm font-medium">${goal.name}</span>
                                                <span class="text-sm font-bold text-green-600">${goal.progress.toFixed(1)}%</span>
                                            </div>
                                        `).join('')}
                                </div>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">Goals Needing Attention</h4>
                                <div class="space-y-2">
                                    ${this.strategicGoals
                                        .map(goal => ({...goal, progress: this.calculateGoalProgress(goal.id, 'strategic')}))
                                        .filter(goal => goal.progress < 50)
                                        .sort((a, b) => a.progress - b.progress)
                                        .slice(0, 3)
                                        .map(goal => `
                                            <div class="flex justify-between items-center p-2 bg-red-50 rounded-md">
                                                <span class="text-sm font-medium">${goal.name}</span>
                                                <span class="text-sm font-bold text-red-600">${goal.progress.toFixed(1)}%</span>
                                            </div>
                                        `).join('') || '<div class="text-sm text-gray-500 p-2">All goals are performing well!</div>'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    exportToCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Company Objective
        csvContent += "Company Objective\n";
        csvContent += "Objective,Description,Progress\n";
        csvContent += `"${this.companyObjective.name}","${this.companyObjective.description}",${this.calculateGoalProgress(0, 'company').toFixed(1)}%\n\n`;
        
        // Strategic Goals
        csvContent += "Strategic Goals\n";
        csvContent += "Goal,Description,Weightage,Progress\n";
        this.strategicGoals.forEach(goal => {
            const progress = this.calculateGoalProgress(goal.id, 'strategic');
            csvContent += `"${goal.name}","${goal.description}",${goal.weightage}%,${progress.toFixed(1)}%\n`;
        });
        csvContent += "\n";
        
        // Subgoals with Person Assignments
        csvContent += "Subgoals and Person Assignments\n";
        csvContent += "Strategic Goal,Subgoal,Description,Weightage,Timeline,Priority,Success Metrics,Person,Department,Role,Person Weightage,Individual Metrics,Target Date,Person Progress\n";
        
        this.strategicGoals.forEach(strategicGoal => {
            const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === strategicGoal.id);
            subgoals.forEach(subgoal => {
                if (subgoal.assignments && subgoal.assignments.length > 0) {
                    subgoal.assignments.forEach(assignment => {
                        const person = this.employees.find(emp => emp.id === assignment.personId);
                        const dept = person ? this.departments.find(d => d.id === person.departmentId) : null;
                        csvContent += `"${strategicGoal.name}","${subgoal.name}","${subgoal.description}",${subgoal.weightage}%,"${subgoal.timeline || ''}","${subgoal.priority || ''}","${subgoal.successMetrics || ''}","${person ? person.name : 'Unknown'}","${dept ? dept.name : 'Unknown'}","${assignment.role}","${assignment.weightage}%","${assignment.individualMetrics || ''}","${assignment.targetDate || ''}","${assignment.progress.toFixed(1)}%"\n`;
                    });
                } else {
                    csvContent += `"${strategicGoal.name}","${subgoal.name}","${subgoal.description}",${subgoal.weightage}%,"${subgoal.timeline || ''}","${subgoal.priority || ''}","${subgoal.successMetrics || ''}","","","","","","",""\n`;
                }
            });
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "company_goals.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    addStrategicGoal() {
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        const saveBtn = document.getElementById('saveGoalBtn');
        
        // Clear form and set up for strategic goal
        this.clearStrategicGoalForm();
        title.textContent = 'Add Strategic Goal';
        saveBtn.textContent = 'Save Strategic Goal';
        saveBtn.removeAttribute('data-edit-id');
        saveBtn.removeAttribute('data-edit-subgoal-id');
        
        modal.classList.remove('hidden');
    }

    addSubgoal(strategicGoalId) {
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        const saveBtn = document.getElementById('saveGoalBtn');
        
        // Find the strategic goal name
        const strategicGoal = this.strategicGoals.find(sg => sg.id === strategicGoalId);
        if (!strategicGoal) {
            alert('Strategic goal not found.');
            return;
        }
        
        // Clear form and set up for subgoal
        this.clearSubgoalForm();
        title.textContent = `Add Subgoal to ${strategicGoal.name}`;
        saveBtn.textContent = 'Save Subgoal';
        saveBtn.removeAttribute('data-edit-id');
        saveBtn.removeAttribute('data-edit-subgoal-id');
        
        modal.classList.remove('hidden');
    }

    clearStrategicGoalForm() {
        // Hide company objective fields
        document.getElementById('companyObjectiveFields').classList.add('hidden');
        document.getElementById('strategicGoalFields').classList.remove('hidden');
        document.getElementById('subgoalFields').classList.add('hidden');
        
        // Clear strategic goal form
        document.getElementById('strategicGoalName').value = '';
        document.getElementById('strategicGoalDescription').value = '';
        document.getElementById('strategicGoalWeightage').value = '';
    }

    clearSubgoalForm() {
        // Hide company objective and strategic goal fields
        document.getElementById('companyObjectiveFields').classList.add('hidden');
        document.getElementById('strategicGoalFields').classList.add('hidden');
        document.getElementById('subgoalFields').classList.remove('hidden');
        
        // Clear subgoal form
        document.getElementById('subgoalName').value = '';
        document.getElementById('subgoalDescription').value = '';
        document.getElementById('subgoalWeightage').value = '';
        document.getElementById('subgoalTimeline').value = '';
        document.getElementById('subgoalPriority').value = '';
        document.getElementById('subgoalMetrics').value = '';
        
        // Clear person assignments
        document.getElementById('personAssignmentsContainer').innerHTML = '';
    }

    saveStrategicGoal() {
        const name = document.getElementById('strategicGoalName').value.trim();
        const description = document.getElementById('strategicGoalDescription').value.trim();
        const weightage = parseFloat(document.getElementById('strategicGoalWeightage').value);
        
        if (!name || !description || isNaN(weightage)) {
            alert('Please fill in all fields.');
            return;
        }
        
        const existingTotal = this.strategicGoals.reduce((sum, sg) => sum + sg.weightage, 0);
        if (existingTotal + weightage > 100) {
            alert('Total strategic goal weightages cannot exceed 100%.');
            return;
        }
        
        this.addStrategicGoal(name, description, weightage);
        this.hideGoalModal();
    }

    editStrategicGoal(goalId) {
        const goal = this.strategicGoals.find(sg => sg.id === goalId);
        if (!goal) return;
        
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        const saveBtn = document.getElementById('saveGoalBtn');
        
        // Set up form for editing
        this.clearStrategicGoalForm();
        title.textContent = 'Edit Strategic Goal';
        saveBtn.textContent = 'Update Strategic Goal';
        saveBtn.setAttribute('data-edit-id', goalId);
        
        // Populate form
        document.getElementById('strategicGoalName').value = goal.name;
        document.getElementById('strategicGoalDescription').value = goal.description;
        document.getElementById('strategicGoalWeightage').value = goal.weightage;
        
        modal.classList.remove('hidden');
    }

    updateStrategicGoal(goalId) {
        const name = document.getElementById('strategicGoalName').value.trim();
        const description = document.getElementById('strategicGoalDescription').value.trim();
        const weightage = parseFloat(document.getElementById('strategicGoalWeightage').value);
        
        if (!name || !description || isNaN(weightage)) {
            alert('Please fill in all fields.');
            return;
        }
        
        const goal = this.strategicGoals.find(sg => sg.id === goalId);
        if (!goal) return;
        
        const existingTotal = this.strategicGoals.reduce((sum, sg) => {
            if (sg.id === goalId) return sum;
            return sum + sg.weightage;
        }, 0);
        
        if (existingTotal + weightage > 100) {
            alert('Total strategic goal weightages cannot exceed 100%.');
            return;
        }
        
        goal.name = name;
        goal.description = description;
        goal.weightage = weightage;
        goal.updatedAt = new Date().toISOString();
        
        this.saveData();
        this.renderDashboard();
        this.hideGoalModal();
    }

    deleteStrategicGoal(goalId) {
        if (!confirm('Are you sure you want to delete this strategic goal? This will also delete all associated subgoals.')) {
            return;
        }
        
        // Remove the strategic goal
        this.strategicGoals = this.strategicGoals.filter(sg => sg.id !== goalId);
        
        // Remove associated subgoals
        this.subgoals = this.subgoals.filter(sg => sg.strategicGoalId !== goalId);
        
        this.saveData();
        this.renderDashboard();
    }

    editSubgoal(subgoalId) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal) return;
        
        const strategicGoal = this.strategicGoals.find(sg => sg.id === subgoal.strategicGoalId);
        if (!strategicGoal) return;
        
        const modal = document.getElementById('goalModal');
        const title = document.getElementById('goalModalTitle');
        const saveBtn = document.getElementById('saveGoalBtn');
        
        // Set up form for editing
        this.clearSubgoalForm();
        title.textContent = `Edit Subgoal in ${strategicGoal.name}`;
        saveBtn.textContent = 'Update Subgoal';
        saveBtn.setAttribute('data-edit-subgoal-id', subgoalId);
        
        // Populate form
        document.getElementById('subgoalName').value = subgoal.name;
        document.getElementById('subgoalDescription').value = subgoal.description;
        document.getElementById('subgoalWeightage').value = subgoal.weightage;
        document.getElementById('subgoalTimeline').value = subgoal.timeline || '';
        document.getElementById('subgoalPriority').value = subgoal.priority || '';
        document.getElementById('subgoalMetrics').value = subgoal.successMetrics || '';
        
        // Populate person assignments
        const container = document.getElementById('personAssignmentsContainer');
        container.innerHTML = '';
        
        if (subgoal.assignments && subgoal.assignments.length > 0) {
            subgoal.assignments.forEach(assignment => {
                const assignmentId = Date.now();
                const assignmentHtml = `
                    <div class="person-assignment border border-gray-200 rounded-md p-4" data-assignment-id="${assignmentId}">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Person</label>
                                <select class="person-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Select Person</option>
                                    ${this.employees.map(emp => {
                                        const dept = this.departments.find(d => d.id === emp.departmentId);
                                        const selected = emp.id === assignment.personId ? 'selected' : '';
                                        return `<option value="${emp.id}" ${selected}>${emp.name} (${dept ? dept.name : 'Unknown'})</option>`;
                                    }).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Role/Responsibility</label>
                                <input type="text" class="person-role w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${assignment.role}" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Weightage (%)</label>
                                <input type="number" class="person-weightage w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" max="100" step="0.1" value="${assignment.weightage}" required>
                            </div>
                            <div class="flex items-end">
                                <button type="button" class="remove-person-assignment bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Individual Success Metrics</label>
                            <textarea class="person-metrics w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" placeholder="e.g., Conduct 50 customer interviews, Implement 3 new features, Achieve 95% customer satisfaction score..." required>${assignment.individualMetrics || ''}</textarea>
                        </div>
                        <div class="grid grid-cols-1 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                                <input type="date" class="person-target-date w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>
                `;
                
                container.insertAdjacentHTML('beforeend', assignmentHtml);
                
                // Add event listeners
                const newAssignment = container.lastElementChild;
                newAssignment.querySelector('.remove-person-assignment').addEventListener('click', () => {
                    newAssignment.remove();
                    this.validateAssignmentWeightages();
                });
                
                newAssignment.querySelector('.person-weightage').addEventListener('input', () => {
                    this.validateAssignmentWeightages();
                });
            });
        }
        
        modal.classList.remove('hidden');
    }

    deleteSubgoal(subgoalId) {
        if (!confirm('Are you sure you want to delete this subgoal?')) {
            return;
        }
        
        this.subgoals = this.subgoals.filter(sg => sg.id !== subgoalId);
        this.saveData();
        this.renderDashboard();
    }

    // Department and Employee Management
    addDepartment() {
        const name = document.getElementById('newDepartment').value.trim();
        if (!name) {
            alert('Please enter a department name.');
            return;
        }
        
        this.addDepartment(name);
        document.getElementById('newDepartment').value = '';
        this.renderDepartmentsList();
        this.updateDepartmentSelect();
    }

    addEmployee() {
        const name = document.getElementById('newEmployeeName').value.trim();
        const departmentId = document.getElementById('newEmployeeDept').value;
        
        if (!name || !departmentId) {
            alert('Please enter employee name and select department.');
            return;
        }
        
        this.addEmployee(name, departmentId);
        document.getElementById('newEmployeeName').value = '';
        document.getElementById('newEmployeeDept').value = '';
        this.renderEmployeesList();
    }

    renderDepartmentsList() {
        const container = document.getElementById('departmentsList');
        container.innerHTML = this.departments.map(dept => `
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <span class="text-sm font-medium">${dept.name}</span>
                <button onclick="goalTracker.deleteDepartment(${dept.id})" class="text-red-600 hover:text-red-800 text-sm">
                    Delete
                </button>
            </div>
        `).join('');
    }

    renderEmployeesList() {
        const container = document.getElementById('employeesList');
        container.innerHTML = this.employees.map(emp => {
            const dept = this.departments.find(d => d.id === emp.departmentId);
            return `
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <div>
                        <span class="text-sm font-medium">${emp.name}</span>
                        <span class="text-xs text-gray-500 ml-2">(${dept ? dept.name : 'Unknown'})</span>
                    </div>
                    <button onclick="goalTracker.deleteEmployee(${emp.id})" class="text-red-600 hover:text-red-800 text-sm">
                        Delete
                    </button>
                </div>
            `;
        }).join('');
    }

    updateDepartmentSelect() {
        const select = document.getElementById('newEmployeeDept');
        select.innerHTML = '<option value="">Select Department</option>' + 
            this.departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('');
    }

    deleteDepartment(deptId) {
        if (!confirm('Are you sure you want to delete this department? This will affect all employees in this department.')) {
            return;
        }
        
        this.departments = this.departments.filter(d => d.id !== deptId);
        this.employees = this.employees.filter(emp => emp.departmentId !== deptId);
        this.saveData();
        this.renderDepartmentsList();
        this.renderEmployeesList();
        this.updateDepartmentSelect();
    }

    deleteEmployee(empId) {
        if (!confirm('Are you sure you want to delete this employee?')) {
            return;
        }
        
        this.employees = this.employees.filter(emp => emp.id !== empId);
        this.saveData();
        this.renderEmployeesList();
    }

    // Validation Methods
    validateAssignmentWeightages() {
        const assignments = document.querySelectorAll('.person-weightage');
        let total = 0;
        
        assignments.forEach(input => {
            const value = parseFloat(input.value) || 0;
            total += value;
        });
        
        const totalElement = document.getElementById('totalAssignmentWeightage');
        if (totalElement) {
            totalElement.textContent = total.toFixed(1) + '%';
            
            if (total > 100) {
                totalElement.classList.add('text-red-600');
                totalElement.classList.remove('text-green-600');
            } else if (total === 100) {
                totalElement.classList.add('text-green-600');
                totalElement.classList.remove('text-red-600');
            } else {
                totalElement.classList.remove('text-red-600', 'text-green-600');
            }
        }
    }

    // Chart Initialization
    initializeCharts() {
        // Progress Overview Chart
        const progressCtx = document.getElementById('progressChart');
        if (progressCtx) {
            const progressData = {
                labels: this.strategicGoals.map(goal => goal.name),
                datasets: [{
                    label: 'Progress (%)',
                    data: this.strategicGoals.map(goal => this.calculateGoalProgress(goal.id, 'strategic')),
                    backgroundColor: this.strategicGoals.map(goal => {
                        const progress = this.calculateGoalProgress(goal.id, 'strategic');
                        return progress >= 70 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#ef4444';
                    }),
                    borderColor: this.strategicGoals.map(goal => {
                        const progress = this.calculateGoalProgress(goal.id, 'strategic');
                        return progress >= 70 ? '#059669' : progress >= 50 ? '#d97706' : '#dc2626';
                    }),
                    borderWidth: 1
                }]
            };
            
            new Chart(progressCtx, {
                type: 'bar',
                data: progressData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 45,
                                minRotation: 0
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    }
                }
            });
        }

        // Department Performance Chart
        const deptCtx = document.getElementById('departmentChart');
        if (deptCtx) {
            const deptData = {};
            
            // Calculate average progress per department
            this.departments.forEach(dept => {
                const deptEmployees = this.employees.filter(emp => emp.departmentId === dept.id);
                let totalProgress = 0;
                let assignmentCount = 0;
                
                deptEmployees.forEach(emp => {
                    this.subgoals.forEach(subgoal => {
                        if (subgoal.assignments) {
                            const empAssignment = subgoal.assignments.find(a => a.personId === emp.id);
                            if (empAssignment) {
                                totalProgress += empAssignment.progress;
                                assignmentCount++;
                            }
                        }
                    });
                });
                
                deptData[dept.name] = assignmentCount > 0 ? totalProgress / assignmentCount : 0;
            });
            
            const chartData = {
                labels: Object.keys(deptData),
                datasets: [{
                    label: 'Average Progress (%)',
                    data: Object.values(deptData),
                    backgroundColor: Object.values(deptData).map(progress => 
                        progress >= 70 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#ef4444'
                    ),
                    borderColor: Object.values(deptData).map(progress => 
                        progress >= 70 ? '#059669' : progress >= 50 ? '#d97706' : '#dc2626'
                    ),
                    borderWidth: 1
                }]
            };
            
            new Chart(deptCtx, {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 10,
                                usePointStyle: true
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    }
                }
            });
        }
    }

    setupFilters() {
        const searchInput = document.getElementById('searchInput');
        const departmentFilter = document.getElementById('departmentFilter');
        const priorityFilter = document.getElementById('priorityFilter');
        const progressFilter = document.getElementById('progressFilter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
        
        if (departmentFilter) {
            departmentFilter.addEventListener('change', () => this.applyFilters());
        }
        
        if (priorityFilter) {
            priorityFilter.addEventListener('change', () => this.applyFilters());
        }
        
        if (progressFilter) {
            progressFilter.addEventListener('change', () => this.applyFilters());
        }
    }

    applyFilters() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const departmentFilter = document.getElementById('departmentFilter')?.value || '';
        const priorityFilter = document.getElementById('priorityFilter')?.value || '';
        const progressFilter = document.getElementById('progressFilter')?.value || '';
        
        // Get all goal cards
        const goalCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.border.p-6');
        
        goalCards.forEach(card => {
            let shouldShow = true;
            
            // Search filter
            if (searchTerm) {
                const cardText = card.textContent.toLowerCase();
                if (!cardText.includes(searchTerm)) {
                    shouldShow = false;
                }
            }
            
            // Department filter (if applicable)
            if (departmentFilter && shouldShow) {
                // This would need to be implemented based on how departments are associated with goals
                // For now, we'll skip this filter
            }
            
            // Priority filter (for subgoals)
            if (priorityFilter && shouldShow) {
                const priorityElement = card.querySelector('[class*="text-red-600"], [class*="text-yellow-600"], [class*="text-green-600"]');
                if (priorityElement) {
                    const priority = priorityElement.textContent;
                    if (!priority.includes(priorityFilter)) {
                        shouldShow = false;
                    }
                }
            }
            
            // Progress filter
            if (progressFilter && shouldShow) {
                const progressElement = card.querySelector('[class*="text-green-600"], [class*="text-yellow-600"], [class*="text-red-600"]');
                if (progressElement) {
                    const progressText = progressElement.textContent;
                    const progress = parseFloat(progressText);
                    
                    if (progressFilter === 'high' && progress < 70) shouldShow = false;
                    if (progressFilter === 'medium' && (progress < 50 || progress >= 70)) shouldShow = false;
                    if (progressFilter === 'low' && progress >= 50) shouldShow = false;
                }
            }
            
            // Show/hide card
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    calculateOverdueAssignments() {
        let overdueCount = 0;
        
        this.subgoals.forEach(subgoal => {
            if (subgoal.assignments) {
                subgoal.assignments.forEach(assignment => {
                    if (assignment.targetDate) {
                        const targetDate = new Date(assignment.targetDate);
                        const today = new Date();
                        if (targetDate < today && assignment.progress < 100) {
                            overdueCount++;
                        }
                    }
                });
            }
        });
        
        return overdueCount;
    }

    renderTimelineView() {
        const allAssignments = [];
        
        // Collect all assignments with their details
        this.subgoals.forEach(subgoal => {
            if (subgoal.assignments) {
                subgoal.assignments.forEach(assignment => {
                    if (assignment.targetDate) {
                        const person = this.employees.find(emp => emp.id === assignment.personId);
                        const strategicGoal = this.strategicGoals.find(sg => sg.id === subgoal.strategicGoalId);
                        
                        allAssignments.push({
                            ...assignment,
                            personName: person ? person.name : 'Unknown',
                            subgoalName: subgoal.name,
                            strategicGoalName: strategicGoal ? strategicGoal.name : 'Unknown',
                            targetDate: new Date(assignment.targetDate)
                        });
                    }
                });
            }
        });
        
        // Sort by target date
        allAssignments.sort((a, b) => a.targetDate - b.targetDate);
        
        // Get next 10 upcoming deadlines
        const upcomingAssignments = allAssignments.slice(0, 10);
        
        if (upcomingAssignments.length === 0) {
            return '<div class="text-gray-500 text-center py-4">No upcoming deadlines found.</div>';
        }
        
        return upcomingAssignments.map(assignment => {
            const daysUntil = Math.ceil((assignment.targetDate - new Date()) / (1000 * 60 * 60 * 24));
            const isOverdue = daysUntil < 0;
            const isUrgent = daysUntil <= 7 && daysUntil >= 0;
            
            let statusClass = 'text-gray-600';
            let statusText = `${Math.abs(daysUntil)} days ${isOverdue ? 'overdue' : 'remaining'}`;
            
            if (isOverdue) {
                statusClass = 'text-red-600';
            } else if (isUrgent) {
                statusClass = 'text-yellow-600';
            }
            
            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md border-l-4 ${isOverdue ? 'border-red-500' : isUrgent ? 'border-yellow-500' : 'border-green-500'}">
                    <div class="flex-1">
                        <div class="font-medium text-sm">${assignment.personName}</div>
                        <div class="text-xs text-gray-600">${assignment.subgoalName} - ${assignment.strategicGoalName}</div>
                        <div class="text-xs text-gray-500">${assignment.role}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-medium ${statusClass}">${statusText}</div>
                        <div class="text-xs text-gray-500">${assignment.targetDate.toLocaleDateString()}</div>
                        <div class="text-xs text-gray-500">${assignment.progress.toFixed(1)}% complete</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    addPersonAssignment() {
        const container = document.getElementById('personAssignmentsContainer');
        if (!container) return;

        // Get employees and departments for the select
        const employees = this.employees || [];
        const departments = this.departments || [];
        const assignmentId = Date.now();

        const assignmentHtml = `
            <div class="person-assignment border border-gray-200 rounded-md p-4" data-assignment-id="${assignmentId}">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Person</label>
                        <select class="person-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Person</option>
                            ${employees.map(emp => {
                                const dept = departments.find(d => d.id === emp.departmentId);
                                return `<option value="${emp.id}">${emp.name} (${dept ? dept.name : 'Unknown'})</option>`;
                            }).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Role/Responsibility</label>
                        <input type="text" class="person-role w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Weightage (%)</label>
                        <input type="number" class="person-weightage w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" max="100" step="0.1" required>
                    </div>
                    <div class="flex items-end">
                        <button type="button" class="remove-person-assignment bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm">Remove</button>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Individual Success Metrics</label>
                    <textarea class="person-metrics w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" placeholder="e.g., Conduct 50 customer interviews, Implement 3 new features, Achieve 95% customer satisfaction score..." required></textarea>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <input type="date" class="person-target-date w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', assignmentHtml);

        // Add event listeners for remove and weightage validation
        const newAssignment = container.lastElementChild;
        newAssignment.querySelector('.remove-person-assignment').addEventListener('click', () => {
            newAssignment.remove();
            this.validateAssignmentWeightages();
        });
        newAssignment.querySelector('.person-weightage').addEventListener('input', () => {
            this.validateAssignmentWeightages();
        });
        this.validateAssignmentWeightages();
    }

    saveSubgoal() {
        const name = document.getElementById('subgoalName').value.trim();
        const description = document.getElementById('subgoalDescription').value.trim();
        const weightage = parseFloat(document.getElementById('subgoalWeightage').value);
        const timeline = document.getElementById('subgoalTimeline').value;
        const priority = document.getElementById('subgoalPriority').value;
        const successMetrics = document.getElementById('subgoalMetrics').value.trim();
        
        if (!name || !description || isNaN(weightage) || !timeline || !priority || !successMetrics) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Get the strategic goal ID from the modal title
        const title = document.getElementById('goalModalTitle').textContent;
        const strategicGoalMatch = title.match(/Add Subgoal to (.+)/);
        if (!strategicGoalMatch) {
            alert('Strategic goal not found.');
            return;
        }
        
        const strategicGoalName = strategicGoalMatch[1];
        const strategicGoal = this.strategicGoals.find(sg => sg.name === strategicGoalName);
        if (!strategicGoal) {
            alert('Strategic goal not found.');
            return;
        }
        
        // Collect person assignments
        const assignments = [];
        const assignmentElements = document.querySelectorAll('.person-assignment');
        
        assignmentElements.forEach(element => {
            const personId = parseInt(element.querySelector('.person-select').value);
            const role = element.querySelector('.person-role').value.trim();
            const weightage = parseFloat(element.querySelector('.person-weightage').value);
            const individualMetrics = element.querySelector('.person-metrics').value.trim();
            const targetDate = element.querySelector('.person-target-date').value;
            
            if (personId && role && !isNaN(weightage) && individualMetrics) {
                assignments.push({
                    personId: personId,
                    role: role,
                    weightage: weightage,
                    individualMetrics: individualMetrics,
                    targetDate: targetDate || null,
                    progress: 0 // Default to 0% progress for new assignments
                });
            }
        });
        
        // Create the subgoal
        const subgoal = {
            id: Date.now(),
            strategicGoalId: strategicGoal.id,
            name: name,
            description: description,
            weightage: weightage,
            timeline: timeline,
            priority: priority,
            successMetrics: successMetrics,
            assignments: assignments,
            createdAt: new Date().toISOString(),
            progress: 0
        };
        
        this.subgoals.push(subgoal);
        this.saveData();
        this.renderDashboard();
        this.hideGoalModal();
    }

    resetToDummyData() {
        // Clear all localStorage data
        localStorage.clear();
        
        // Reset all data arrays
        this.companyObjective = null;
        this.strategicGoals = [];
        this.subgoals = [];
        this.managerGoals = [];
        this.employees = [];
        this.departments = [];
        
        // Initialize dummy data
        this.initializeDummyData();
        
        // Re-render dashboard
        this.renderDashboard();
        
        alert('Data reset successfully! Sample data has been loaded.');
    }

    showStrategicGoalDetails(strategicGoalId) {
        const strategicGoal = this.strategicGoals.find(sg => sg.id === strategicGoalId);
        if (!strategicGoal) return;

        const subgoals = this.subgoals.filter(sg => sg.strategicGoalId === strategicGoalId);
        const progress = this.calculateGoalProgress(strategicGoalId, 'strategic');
        const progressClass = progress >= 70 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">${strategicGoal.name}</h2>
                            <p class="text-gray-600 text-lg">${strategicGoal.description}</p>
                            <div class="flex items-center space-x-6 mt-3 text-sm">
                                <span class="text-gray-500">Weightage: <span class="font-semibold">${strategicGoal.weightage}%</span></span>
                                <span class="text-gray-500">Subgoals: <span class="font-semibold">${subgoals.length}</span></span>
                                <span class="text-gray-500">Created: <span class="font-semibold">${new Date(strategicGoal.createdAt).toLocaleDateString()}</span></span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold ${progressClass}">${progress.toFixed(1)}%</div>
                            <div class="text-sm text-gray-500">Overall Progress</div>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="w-full bg-gray-200 rounded-full h-4 mb-6">
                        <div class="progress-bar h-4 rounded-full ${progress >= 70 ? '' : progress >= 50 ? 'warning' : 'danger'}" style="width: ${progress}%"></div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex space-x-3 mb-6">
                        <button id="backToDashboardBtn" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            ← Back to Dashboard
                        </button>
                        <button id="addSubgoalToStrategicBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Add Subgoal
                        </button>
                        <button id="editStrategicGoalBtn" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                            Edit Goal
                        </button>
                        <button id="deleteStrategicGoalBtn" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Delete Goal
                        </button>
                        <button id="closeStrategicGoalDetailsBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-auto">
                            Close
                        </button>
                    </div>

                    <!-- Subgoals Section -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-semibold text-gray-900">Subgoals</h3>
                            <span class="text-sm text-gray-500">${subgoals.length} subgoal${subgoals.length !== 1 ? 's' : ''}</span>
                        </div>
                        
                        ${subgoals.length === 0 ? `
                            <div class="text-center py-8">
                                <p class="text-gray-500 mb-4">No subgoals created yet.</p>
                                <button id="createFirstSubgoalBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Create First Subgoal
                                </button>
                            </div>
                        ` : `
                            <div class="space-y-4">
                                ${subgoals.map(subgoal => {
                                    const subgoalProgress = this.calculateGoalProgress(subgoal.id, 'subgoal');
                                    const subgoalProgressClass = subgoalProgress >= 70 ? 'text-green-600' : subgoalProgress >= 50 ? 'text-yellow-600' : 'text-red-600';
                                    const assignments = subgoal.assignments || [];
                                    
                                    return `
                                        <div class="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                                            <div class="flex justify-between items-start mb-3">
                                                <div class="flex-1">
                                                    <h4 class="text-lg font-semibold text-gray-900 mb-1">${subgoal.name}</h4>
                                                    <p class="text-gray-600 text-sm mb-2">${subgoal.description}</p>
                                                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span>Weightage: ${subgoal.weightage}%</span>
                                                        <span>Timeline: ${subgoal.timeline}</span>
                                                        <span>Priority: <span class="px-2 py-1 rounded-full text-xs ${subgoal.priority === 'High' ? 'bg-red-100 text-red-800' : subgoal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">${subgoal.priority}</span></span>
                                                        <span>Assignments: ${assignments.length}</span>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                    <div class="text-lg font-bold ${subgoalProgressClass}">${subgoalProgress.toFixed(1)}%</div>
                                                    <div class="text-xs text-gray-500">Progress</div>
                                                </div>
                                            </div>
                                            
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                                                <div class="progress-bar h-2 rounded-full ${subgoalProgress >= 70 ? '' : subgoalProgress >= 50 ? 'warning' : 'danger'}" style="width: ${subgoalProgress}%"></div>
                                            </div>
                                            
                                            <div class="flex space-x-2">
                                                <button class="view-subgoal-details bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm" data-subgoal-id="${subgoal.id}">
                                                    View Details
                                                </button>
                                                <button class="edit-subgoal bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm" data-subgoal-id="${subgoal.id}">
                                                    Edit
                                                </button>
                                                <button class="delete-subgoal bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm" data-subgoal-id="${subgoal.id}">
                                                    Delete
                                                </button>
                                            </div>
                                            
                                            ${assignments.length > 0 ? `
                                                <div class="mt-3 pt-3 border-t border-gray-200">
                                                    <h5 class="text-sm font-medium text-gray-700 mb-2">Assignments:</h5>
                                                    <div class="space-y-2">
                                                        ${assignments.map(assignment => {
                                                            const person = this.employees.find(emp => emp.id === assignment.personId);
                                                            const isOverdue = new Date(assignment.targetDate) < new Date();
                                                            
                                                            // Calculate progress based on completed metrics
                                                            const calculatedProgress = this.calculateAssignmentProgress(assignment);
                                                            const assignmentProgressClass = calculatedProgress >= 70 ? 'text-green-600' : calculatedProgress >= 50 ? 'text-yellow-600' : 'text-red-600';
                                                            
                                                            return `
                                                                <div class="flex justify-between items-center text-xs">
                                                                    <div>
                                                                        <span class="font-medium">${person ? person.name : 'Unknown'}</span>
                                                                        <span class="text-gray-500"> - ${assignment.role}</span>
                                                                    </div>
                                                                    <div class="text-right">
                                                                        <span class="${assignmentProgressClass} font-medium">${calculatedProgress}%</span>
                                                                        <span class="text-gray-500"> (${assignment.weightage}%)</span>
                                                                    </div>
                                                                </div>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('#closeStrategicGoalDetailsBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Back to dashboard button
        modal.querySelector('#backToDashboardBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.renderDashboard();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Close modal with Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        modal.querySelector('#addSubgoalToStrategicBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.addSubgoal(strategicGoalId);
        });

        modal.querySelector('#createFirstSubgoalBtn')?.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.addSubgoal(strategicGoalId);
        });

        modal.querySelector('#editStrategicGoalBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.editStrategicGoal(strategicGoalId);
        });

        modal.querySelector('#deleteStrategicGoalBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this strategic goal? This will also delete all associated subgoals.')) {
                this.deleteStrategicGoal(strategicGoalId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        });

        // Add event listeners for assignment actions
        modal.querySelectorAll('.update-progress').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.showProgressModal(subgoalId, personId);
            });
        });

        // Add event listeners for metric checkboxes
        modal.querySelectorAll('.metric-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const assignmentId = parseInt(e.target.dataset.assignmentId);
                const metricIndex = parseInt(e.target.dataset.metricIndex);
                const isCompleted = e.target.checked;
                
                this.updateMetricProgress(assignmentId, metricIndex, isCompleted);
                
                // Update the label styling
                const label = e.target.nextElementSibling;
                if (isCompleted) {
                    label.classList.add('line-through', 'text-gray-500');
                } else {
                    label.classList.remove('line-through', 'text-gray-500');
                }
                
                // Refresh the modal to show updated progress
                setTimeout(() => {
                    this.showSubgoalDetails(subgoalId);
                }, 100);
            });
        });

        modal.querySelectorAll('.edit-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.editPersonAssignment(subgoalId, personId);
            });
        });

        modal.querySelectorAll('.remove-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                if (confirm('Are you sure you want to remove this assignment?')) {
                    this.removePersonAssignment(subgoalId, personId);
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEscape);
                }
            });
        });

        // Add event listeners for subgoal actions
        modal.querySelectorAll('.view-subgoal-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subgoalId = parseInt(e.target.dataset.subgoalId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.showSubgoalDetails(subgoalId);
            });
        });

        modal.querySelectorAll('.edit-subgoal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subgoalId = parseInt(e.target.dataset.subgoalId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.editSubgoal(subgoalId);
            });
        });

        modal.querySelectorAll('.delete-subgoal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subgoalId = parseInt(e.target.dataset.subgoalId);
                if (confirm('Are you sure you want to delete this subgoal?')) {
                    this.deleteSubgoal(subgoalId);
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEscape);
                }
            });
        });
    }

    editPersonAssignment(subgoalId, personId) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal) return;

        const assignment = subgoal.assignments?.find(a => a.personId === personId);
        if (!assignment) return;

        const person = this.employees.find(emp => emp.id === personId);
        if (!person) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Edit Person Assignment</h3>
                    
                    <form id="editAssignmentForm">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Person</label>
                                <input type="text" value="${person.name}" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <input type="text" id="editRole" value="${assignment.role}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Weightage (%)</label>
                                <input type="number" id="editWeightage" value="${assignment.weightage}" min="1" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Individual Metrics</label>
                                <textarea id="editIndividualMetrics" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">${assignment.individualMetrics}</textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                                <input type="date" id="editTargetDate" value="${assignment.targetDate}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                                <input type="number" id="editProgress" value="${assignment.progress}" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3 mt-6">
                            <button type="button" id="cancelEditAssignmentBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Cancel
                            </button>
                            <button type="submit" id="saveEditAssignmentBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('#cancelEditAssignmentBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#saveEditAssignmentBtn').addEventListener('click', (e) => {
            e.preventDefault();
            
            const updatedAssignment = {
                ...assignment,
                role: document.getElementById('editRole').value,
                weightage: parseInt(document.getElementById('editWeightage').value),
                individualMetrics: document.getElementById('editIndividualMetrics').value,
                targetDate: document.getElementById('editTargetDate').value,
                progress: parseInt(document.getElementById('editProgress').value)
            };

            // Update the assignment
            const assignmentIndex = subgoal.assignments.findIndex(a => a.personId === personId);
            if (assignmentIndex !== -1) {
                subgoal.assignments[assignmentIndex] = updatedAssignment;
                this.saveData();
                this.renderDashboard();
            }

            document.body.removeChild(modal);
        });
    }

    removePersonAssignment(subgoalId, personId) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal || !subgoal.assignments) return;

        const assignmentIndex = subgoal.assignments.findIndex(a => a.personId === personId);
        if (assignmentIndex !== -1) {
            subgoal.assignments.splice(assignmentIndex, 1);
            this.saveData();
            this.renderDashboard();
        }
    }

    showProgressModal(subgoalId, personId = null) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal) return;

        this.currentProgressGoalId = subgoalId;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Update Progress - ${subgoal.name}</h3>
                    <div id="progressFormContainer">
                        ${this.renderProgressForm(subgoalId, personId)}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    renderProgressForm(subgoalId, personId = null) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal) return '';

        const assignments = subgoal.assignments || [];
        
        if (personId) {
            // Update specific person's progress
            const assignment = assignments.find(a => a.personId === personId);
            const person = this.employees.find(emp => emp.id === personId);
            
            if (!assignment || !person) return '';

            return `
                <form id="progressForm">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Person</label>
                            <input type="text" value="${person.name}" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Current Progress (%)</label>
                            <input type="number" id="progressInput" value="${assignment.progress}" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                            <textarea id="progressNotes" rows="3" placeholder="Add any notes about the progress..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" id="cancelProgressBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" id="saveProgressBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Save Progress
                        </button>
                    </div>
                </form>
            `;
        } else {
            // Update all assignments progress
            return `
                <form id="progressForm">
                    <div class="space-y-4">
                        ${assignments.map(assignment => {
                            const person = this.employees.find(emp => emp.id === assignment.personId);
                            return person ? `
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-medium text-gray-900">${person.name}</h4>
                                        <span class="text-sm text-gray-500">${assignment.role}</span>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                                        <input type="number" id="progress_${assignment.personId}" value="${assignment.progress}" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    </div>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" id="cancelProgressBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" id="saveProgressBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Save All Progress
                        </button>
                    </div>
                </form>
            `;
        }
    }

    showSubgoalDetails(subgoalId) {
        const subgoal = this.subgoals.find(sg => sg.id === subgoalId);
        if (!subgoal) return;

        const strategicGoal = this.strategicGoals.find(sg => sg.id === subgoal.strategicGoalId);
        const progress = this.calculateGoalProgress(subgoalId, 'subgoal');
        const progressClass = progress >= 70 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
        const assignments = subgoal.assignments || [];

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex-1">
                            <div class="text-sm text-gray-500 mb-1">Strategic Goal: ${strategicGoal.name}</div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">${subgoal.name}</h2>
                            <p class="text-gray-600 text-lg">${subgoal.description}</p>
                            <div class="flex items-center space-x-6 mt-3 text-sm">
                                <span class="text-gray-500">Weightage: <span class="font-semibold">${subgoal.weightage}%</span></span>
                                <span class="text-gray-500">Timeline: <span class="font-semibold">${subgoal.timeline}</span></span>
                                <span class="text-gray-500">Priority: <span class="px-2 py-1 rounded-full text-xs ${subgoal.priority === 'High' ? 'bg-red-100 text-red-800' : subgoal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">${subgoal.priority}</span></span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold ${progressClass}">${progress.toFixed(1)}%</div>
                            <div class="text-sm text-gray-500">Progress</div>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="w-full bg-gray-200 rounded-full h-4 mb-6">
                        <div class="progress-bar h-4 rounded-full ${progress >= 70 ? '' : progress >= 50 ? 'warning' : 'danger'}" style="width: ${progress}%"></div>
                    </div>

                    <!-- Success Metrics -->
                    <div class="bg-blue-50 rounded-lg p-4 mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Success Metrics</h3>
                        <p class="text-gray-700">${subgoal.successMetrics}</p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex space-x-3 mb-6">
                        <button id="backToStrategicGoalBtn" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            ← Back to Strategic Goal
                        </button>
                        <button id="addPersonAssignmentBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Add Person Assignment
                        </button>
                        <button id="editSubgoalBtn" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                            Edit Subgoal
                        </button>
                        <button id="deleteSubgoalBtn" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Delete Subgoal
                        </button>
                        <button id="closeSubgoalDetailsBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-auto">
                            Close
                        </button>
                    </div>

                    <!-- Assignments Section -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-semibold text-gray-900">Person Assignments</h3>
                            <span class="text-sm text-gray-500">${assignments.length} assignment${assignments.length !== 1 ? 's' : ''}</span>
                        </div>
                        
                        ${assignments.length === 0 ? `
                            <div class="text-center py-8">
                                <p class="text-gray-500 mb-4">No person assignments yet.</p>
                                <button id="createFirstAssignmentBtn" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Add First Assignment
                                </button>
                            </div>
                        ` : `
                            <div class="space-y-4">
                                ${assignments.map(assignment => {
                                    const person = this.employees.find(emp => emp.id === assignment.personId);
                                    const isOverdue = new Date(assignment.targetDate) < new Date();
                                    
                                    // Calculate progress based on completed metrics
                                    const calculatedProgress = this.calculateAssignmentProgress(assignment);
                                    const assignmentProgressClass = calculatedProgress >= 70 ? 'text-green-600' : calculatedProgress >= 50 ? 'text-yellow-600' : 'text-red-600';
                                    
                                    return `
                                        <div class="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                                            <div class="flex justify-between items-start mb-3">
                                                <div class="flex-1">
                                                    <div class="flex items-center space-x-2 mb-2">
                                                        <h4 class="text-lg font-semibold text-gray-900">${person ? person.name : 'Unknown'}</h4>
                                                        ${isOverdue ? '<span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Overdue</span>' : ''}
                                                    </div>
                                                    <p class="text-gray-600 text-sm mb-2">${assignment.role}</p>
                                                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span>Weightage: ${assignment.weightage}%</span>
                                                        <span>Target Date: ${new Date(assignment.targetDate).toLocaleDateString()}</span>
                                                        <span>Progress: <span class="${assignmentProgressClass} font-medium">${calculatedProgress}%</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                                                <div class="progress-bar h-2 rounded-full ${calculatedProgress >= 70 ? '' : calculatedProgress >= 50 ? 'warning' : 'danger'}" style="width: ${calculatedProgress}%"></div>
                                            </div>
                                            
                                            <div class="bg-gray-50 rounded p-3 mb-3">
                                                <h5 class="text-sm font-medium text-gray-700 mb-1">Individual Metrics:</h5>
                                                <div class="space-y-2">
                                                    ${this.renderIndividualMetricsCheckboxes(assignment)}
                                                </div>
                                            </div>
                                            
                                            <div class="flex space-x-2">
                                                <button class="edit-assignment bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 text-sm" data-assignment-id="${assignment.personId}">
                                                    Edit
                                                </button>
                                                <button class="remove-assignment bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm" data-assignment-id="${assignment.personId}">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('#closeSubgoalDetailsBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Back to strategic goal button
        modal.querySelector('#backToStrategicGoalBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.showStrategicGoalDetails(subgoal.strategicGoalId);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Close modal with Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        modal.querySelector('#addPersonAssignmentBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.addPersonAssignment(subgoalId);
        });

        modal.querySelector('#createFirstAssignmentBtn')?.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.addPersonAssignment(subgoalId);
        });

        modal.querySelector('#editSubgoalBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
            this.editSubgoal(subgoalId);
        });

        modal.querySelector('#deleteSubgoalBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this subgoal?')) {
                this.deleteSubgoal(subgoalId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        });

        // Add event listeners for assignment actions
        modal.querySelectorAll('.update-progress').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.showProgressModal(subgoalId, personId);
            });
        });

        // Add event listeners for metric checkboxes
        modal.querySelectorAll('.metric-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const assignmentId = parseInt(e.target.dataset.assignmentId);
                const metricIndex = parseInt(e.target.dataset.metricIndex);
                const isCompleted = e.target.checked;
                
                this.updateMetricProgress(assignmentId, metricIndex, isCompleted);
                
                // Update the label styling
                const label = e.target.nextElementSibling;
                if (isCompleted) {
                    label.classList.add('line-through', 'text-gray-500');
                } else {
                    label.classList.remove('line-through', 'text-gray-500');
                }
                
                // Refresh the modal to show updated progress
                setTimeout(() => {
                    this.showSubgoalDetails(subgoalId);
                }, 100);
            });
        });

        modal.querySelectorAll('.edit-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
                this.editPersonAssignment(subgoalId, personId);
            });
        });

        modal.querySelectorAll('.remove-assignment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const personId = parseInt(e.target.dataset.assignmentId);
                if (confirm('Are you sure you want to remove this assignment?')) {
                    this.removePersonAssignment(subgoalId, personId);
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', handleEscape);
                }
            });
        });
    }

    renderIndividualMetricsCheckboxes(assignment) {
        // Initialize completedMetrics array if it doesn't exist
        if (!assignment.completedMetrics) {
            assignment.completedMetrics = [];
        }

        // Parse individual metrics into separate tasks
        const metrics = this.parseMetricsIntoTasks(assignment.individualMetrics);
        
        return metrics.map((metric, index) => {
            const isCompleted = assignment.completedMetrics.includes(index);
            return `
                <div class="flex items-center space-x-2">
                    <input type="checkbox" 
                           id="metric_${assignment.personId}_${index}" 
                           class="metric-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                           data-assignment-id="${assignment.personId}" 
                           data-metric-index="${index}"
                           ${isCompleted ? 'checked' : ''}>
                    <label for="metric_${assignment.personId}_${index}" class="text-sm text-gray-700 ${isCompleted ? 'line-through text-gray-500' : ''}">
                        ${metric}
                    </label>
                </div>
            `;
        }).join('');
    }

    parseMetricsIntoTasks(metricsText) {
        // Split metrics by common delimiters and clean up
        const tasks = metricsText
            .split(/[;,\n]/)
            .map(task => task.trim())
            .filter(task => task.length > 0)
            .map(task => {
                // Remove common prefixes and clean up
                return task
                    .replace(/^[-•*]\s*/, '') // Remove bullet points
                    .replace(/^\d+\.\s*/, '') // Remove numbers
                    .trim();
            });
        
        return tasks.length > 0 ? tasks : [metricsText]; // Fallback to original text if no parsing
    }

    updateMetricProgress(assignmentId, metricIndex, isCompleted) {
        // Find the assignment in all subgoals
        for (const subgoal of this.subgoals) {
            if (subgoal.assignments) {
                const assignment = subgoal.assignments.find(a => a.personId === assignmentId);
                if (assignment) {
                    // Initialize completedMetrics array if it doesn't exist
                    if (!assignment.completedMetrics) {
                        assignment.completedMetrics = [];
                    }

                    if (isCompleted) {
                        if (!assignment.completedMetrics.includes(metricIndex)) {
                            assignment.completedMetrics.push(metricIndex);
                        }
                    } else {
                        const index = assignment.completedMetrics.indexOf(metricIndex);
                        if (index > -1) {
                            assignment.completedMetrics.splice(index, 1);
                        }
                    }

                    // Calculate progress based on completed metrics
                    const metrics = this.parseMetricsIntoTasks(assignment.individualMetrics);
                    const progress = metrics.length > 0 ? 
                        Math.round((assignment.completedMetrics.length / metrics.length) * 100) : 
                        assignment.progress || 0;
                    
                    assignment.progress = progress;
                    this.saveData();
                    return;
                }
            }
        }
    }

    calculateAssignmentProgress(assignment) {
        if (!assignment.individualMetrics) {
            return assignment.progress || 0;
        }

        const metrics = this.parseMetricsIntoTasks(assignment.individualMetrics);
        if (metrics.length === 0) {
            return assignment.progress || 0;
        }

        // Initialize completedMetrics array if it doesn't exist
        if (!assignment.completedMetrics) {
            assignment.completedMetrics = [];
        }

        return Math.round((assignment.completedMetrics.length / metrics.length) * 100);
    }
}

// Initialize the application
let goalTracker;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, creating GoalTracker instance...');
    goalTracker = new GoalTracker();
    console.log('GoalTracker instance created:', goalTracker);
}); 