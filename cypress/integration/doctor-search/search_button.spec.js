import selectors from '../../support/selectors'
const BASE_PATH = 'https://demo.clickdoc.de/cd-de'

context('CLICKDOC Doctor Search', () => {
	beforeEach(() => {
		cy.visit(BASE_PATH)
			.get(selectors.appContainer)
			.then(appContainer => {
				const cookieAgreeBtn = appContainer.find(selectors.cookieAgreeBtn)
				if (cookieAgreeBtn.length > 0) {
					cy.wrap(cookieAgreeBtn).click()
				}
			})
	})
	describe('Search behaviour analysis', () => {
		it('Finds two doctors in the results when "Peter Test" is searched', () => {
			cy.get(selectors.appContainer)
				.then(appContainer => {
					const menuToggle = appContainer.find(selectors.menuToggle)
					if (menuToggle.length > 0) {
						cy.wrap(menuToggle).click()
					}
				})
				.get(selectors.doctorSearchBtn)
				.click()
				.get(selectors.doctorSearchInputField)
				.type('Peter Test')
				.get(selectors.searchSubmitBtn)
				.click()
				.get(selectors.resultHeaderTitle)
				.should('contain', 'Dr. Peter Test')
				.and('contain', 'Dr. Peter Test ABD')
				.and('be.visible')
		})
	})
})
